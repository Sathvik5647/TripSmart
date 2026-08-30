/**
 * Trip recommendation service
 *
 * Approach: SUPERVISED / collaborative + content hybrid (not RL).
 *
 * Why not reinforcement learning?
 *   RL learns a policy from sequential rewards (clicks, rebookings over time).
 *   "Users like you also took this trip" is a ranking / similarity problem:
 *   we have labeled examples (completed trips) and want to predict items a
 *   user will like. That is classic supervised / collaborative filtering.
 *
 * Model (v1 — no GPU training required):
 *   1. Content features: destination, duration band, budget band, transport mode
 *   2. User-user kNN: cosine similarity on destination + spend histograms
 *   3. Score other users' trips; return full trip cards
 *
 * Later: train LightFM / two-tower (user embedding × trip embedding) on
 * implicit feedback (saved, booked, completed). RL only if we optimize
 * sequential session actions (e.g. bandit for post-booking upsell).
 */

const Trip = require('../models/Trip');

const SAMPLE_TRIPS = [
  {
    _id: 'rec-goa-beach',
    source: 'Mumbai',
    destination: 'Goa',
    startDate: '2026-01-12',
    endDate: '2026-01-16',
    travelers: 2,
    durationDays: 5,
    budgetBand: '20-40k',
    transportMode: 'flight',
    totalCost: 28400,
    highlights: ['Calangute beach day', 'Old Goa churches', 'Sunset cruise'],
    similarBecause: 'Beach getaway under ₹30k — popular with similar travelers',
  },
  {
    _id: 'rec-jaipur-heritage',
    source: 'Delhi',
    destination: 'Jaipur',
    startDate: '2025-11-04',
    endDate: '2025-11-07',
    travelers: 2,
    durationDays: 4,
    budgetBand: '10-20k',
    transportMode: 'train',
    totalCost: 16250,
    highlights: ['Amber Fort', 'City Palace', 'Bazaar walk'],
    similarBecause: 'Heritage weekend by train — matches culture + budget style',
  },
  {
    _id: 'rec-manali-hills',
    source: 'Delhi',
    destination: 'Manali',
    startDate: '2025-12-20',
    endDate: '2025-12-25',
    travelers: 3,
    durationDays: 6,
    budgetBand: '20-40k',
    transportMode: 'bus',
    totalCost: 31800,
    highlights: ['Solang Valley', 'Old Manali cafes', 'Hadimba Temple'],
    similarBecause: 'Hill trip with friends in the same spend range',
  },
];

function budgetBand(amount) {
  if (!amount || amount < 10000) return 'under-10k';
  if (amount < 20000) return '10-20k';
  if (amount < 40000) return '20-40k';
  if (amount < 80000) return '40-80k';
  return '80k+';
}

function durationBand(start, end) {
  const days = Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
  if (days <= 2) return '1-2';
  if (days <= 4) return '3-4';
  if (days <= 7) return '5-7';
  return '8+';
}

function vectorFromTrips(trips) {
  const dest = {};
  const bands = {};
  for (const t of trips) {
    const d = t.destination?.name || t.destination || 'unknown';
    dest[d] = (dest[d] || 0) + 1;
    const b = budgetBand(t.plans?.[0]?.costs?.total || t.booking?.totalAmount || 0);
    bands[b] = (bands[b] || 0) + 1;
  }
  return { dest, bands };
}

function cosine(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const k of keys) {
    const x = a[k] || 0;
    const y = b[k] || 0;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function formatTrip(trip, similarBecause) {
  const plan = trip.plans?.[0] || {};
  const mode = plan.transport?.mode || plan.transport?.outbound?.mode || plan.transport?.type || 'mixed';
  return {
    _id: trip._id.toString(),
    source: trip.source?.name || trip.source?.code,
    destination: trip.destination?.name || trip.destination?.code,
    startDate: trip.startDate,
    endDate: trip.endDate,
    travelers: trip.travelers,
    durationDays: durationBand(trip.startDate, trip.endDate),
    transportMode: mode,
    totalCost: plan.costs?.total || trip.booking?.totalAmount || 0,
    highlights: plan.highlights || [],
    similarBecause,
    status: trip.booking?.status,
  };
}

async function recommendForUser(userId, limit = 6) {
  const mine = await Trip.find({ userId }).lean();
  const myVec = vectorFromTrips(mine);

  const others = await Trip.find({
    userId: { $ne: userId },
    'booking.status': { $in: ['confirmed', 'completed', 'saved'] },
  })
    .limit(200)
    .lean();

  if (others.length === 0) {
    const dests = new Set(mine.map(t => (t.destination?.name || '').toLowerCase()));
    return SAMPLE_TRIPS.filter(s => !dests.has(s.destination.toLowerCase())).slice(0, limit);
  }

  const byUser = {};
  for (const t of others) {
    const uid = String(t.userId || 'anon');
    if (!byUser[uid]) byUser[uid] = [];
    byUser[uid].push(t);
  }

  const userScores = Object.entries(byUser).map(([uid, trips]) => ({
    uid,
    trips,
    sim: cosine(myVec.dest, vectorFromTrips(trips).dest) * 0.7
      + cosine(myVec.bands, vectorFromTrips(trips).bands) * 0.3,
  }));

  userScores.sort((a, b) => b.sim - a.sim);

  const seenDest = new Set(mine.map(t => (t.destination?.name || '').toLowerCase()));
  const ranked = [];
  for (const u of userScores) {
    for (const trip of u.trips) {
      const dest = (trip.destination?.name || '').toLowerCase();
      if (seenDest.has(dest)) continue;
      seenDest.add(dest);
      ranked.push(formatTrip(
        trip,
        u.sim > 0.2
          ? `Travelers with similar destinations also booked this (similarity ${(u.sim * 100).toFixed(0)}%)`
          : 'Popular with other TripSmart travelers'
      ));
      if (ranked.length >= limit) return ranked;
    }
  }

  if (ranked.length < limit) {
    ranked.push(...SAMPLE_TRIPS.filter(s => !seenDest.has(s.destination.toLowerCase())));
  }
  return ranked.slice(0, limit);
}
// ==============================================================
// Content-Based Filtering for Alternative Trips (Results Page)
// ==============================================================

/**
 * Extracts a feature vector for a given trip plan.
 * Features: [priceNorm, durationNorm, comfortLevel]
 */
function extractFeatures(tripData) {
  // Normalize price (max 100k)
  const priceNorm = Math.min((tripData.totalCost || tripData.price || 10000) / 100000, 1.0);
  
  // Normalize duration (max 14 days)
  const duration = typeof tripData.durationDays === 'number' ? tripData.durationDays : parseInt(tripData.duration || 5);
  const durationNorm = Math.min(duration / 14, 1.0);

  // Comfort level
  let comfortLevel = 0.5;
  if (tripData.tier === 'Premium' || tripData.tier === 'Luxury' || tripData.budgetBand === '80k+') comfortLevel = 1.0;
  if (tripData.tier === 'Budget' || tripData.budgetBand === 'under-10k') comfortLevel = 0.2;

  return [priceNorm, durationNorm, comfortLevel];
}

/**
 * Gets recommended alternative trips using content-based filtering.
 * Compares the current plan against a pool of sample/popular trips.
 */
function recommendAlternatives(currentPlan, pool = SAMPLE_TRIPS) {
  if (!currentPlan) return [];

  // If currentPlan is just a generated response, structure it to extract features
  const targetData = {
    price: currentPlan.price || 0,
    duration: currentPlan.duration || 5,
    tier: currentPlan.name || 'Best Value',
    destination: currentPlan.destination || 'Unknown'
  };

  const targetVector = extractFeatures(targetData);

  const scoredAlternatives = pool.map(plan => {
    const vector = extractFeatures(plan);
    const similarity = cosine(
      { p: targetVector[0], d: targetVector[1], c: targetVector[2] },
      { p: vector[0], d: vector[1], c: vector[2] }
    );
    return { plan, similarity };
  });

  // Sort descending by similarity
  scoredAlternatives.sort((a, b) => b.similarity - a.similarity);

  // Return top 3 matches that aren't the exact same destination
  return scoredAlternatives
    .filter(a => a.plan.destination.toLowerCase() !== targetData.destination.toLowerCase())
    .slice(0, 3)
    .map(a => ({
      ...a.plan,
      matchPercentage: Math.round(a.similarity * 100),
      similarBecause: `Similar price and duration to your current plan (${Math.round(a.similarity * 100)}% match)`
    }));
}

module.exports = { recommendForUser, recommendAlternatives, SAMPLE_TRIPS, budgetBand };
