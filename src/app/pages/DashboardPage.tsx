import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { motion, AnimatePresence } from 'motion/react';
import { formatINR, tripsAPI } from '../../services/api';

// ── Design tokens (match TripDetailsPage palette) ──────────────────────────
const C = {
  bg:         '#013220',
  teal:       '#0B6E4F',
  emerald:    '#50C878',
  mint:       '#D1F2EB',
  card:       'rgba(11,110,79,0.18)',
  cardBorder: 'rgba(80,200,120,0.16)',
  textMain:   '#D1F2EB',
  textSub:    'rgba(209,242,235,0.58)',
  textDim:    'rgba(209,242,235,0.35)',
};

// ── Popular Indian routes for price forecast widget ────────────────────────
const POPULAR_ROUTES = [
  { label: 'Delhi → Goa',     mode: 'flight', price: 5_200 },
  { label: 'Mumbai → Goa',    mode: 'flight', price: 4_100 },
  { label: 'Delhi → Jaipur',  mode: 'train',  price: 550   },
  { label: 'Bangalore → Goa', mode: 'flight', price: 4_800 },
  { label: 'Mumbai → Pune',   mode: 'train',  price: 200   },
];

// ── Hardcoded inspiration destinations ─────────────────────────────────────
const INSPIRATION = [
  { city: 'Jaipur',      img: 'https://images.unsplash.com/photo-1477587458883-47145ed6979c?w=600&q=70&auto=format&fit=crop', tagline: 'Pink City magic', budget: '₹8k–18k' },
  { city: 'Goa',        img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=70&auto=format&fit=crop', tagline: 'Sun, sea & shacks',  budget: '₹10k–25k' },
  { city: 'Manali',     img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=70&auto=format&fit=crop', tagline: 'Mountain bliss',    budget: '₹12k–28k' },
  { city: 'Varanasi',   img: 'https://images.unsplash.com/photo-1561361058-c24e01238a46?w=600&q=70&auto=format&fit=crop', tagline: 'Timeless ghats',    budget: '₹6k–14k' },
  { city: 'Ooty',       img: 'https://images.unsplash.com/photo-1598901847919-b0e9be6c62db?w=600&q=70&auto=format&fit=crop', tagline: 'Nilgiri hills',     budget: '₹8k–16k' },
  { city: 'Udaipur',    img: 'https://images.unsplash.com/photo-1588783657595-a4edba6a1032?w=600&q=70&auto=format&fit=crop', tagline: 'City of lakes',     budget: '₹9k–20k' },
];

// ── Travel Tips ────────────────────────────────────────────────────────────
const TIPS = [
  { icon: '🕐', title: 'Book 45+ days ahead', body: 'Domestic flights are cheapest 45-60 days before departure.' },
  { icon: '🚂', title: 'Trains beat flights for < 600 km', body: 'On short routes, trains are 4-5× cheaper and often faster door-to-door.' },
  { icon: '🌧️', title: 'Avoid peak months', body: 'Oct–Nov and Apr–May see 20-40% fare spikes for popular routes.' },
  { icon: '💳', title: 'UPI discounts', body: 'Many travel portals offer an extra 3-5% off when you pay via UPI.' },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function PriceTrendBar({ route }: { route: typeof POPULAR_ROUTES[0] }) {
  // Synthetic 7-bar sparkline seeded from price
  const seed = route.price % 7;
  const bars = [0.7, 0.85, 0.72, 0.9, 0.78, 0.95, 1.0].map(
    (v, i) => v * (1 + (((i + seed) % 5) - 2) * 0.04)
  );
  const max = Math.max(...bars);
  const trend = bars[6] > bars[0] ? 'rising' : 'stable';
  const trendColor = trend === 'rising' ? '#f87171' : C.emerald;
  const trendLabel = trend === 'rising' ? '↑ Rising' : '→ Stable';

  return (
    <div className="rounded-xl p-3" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.mint }}>{route.label}</p>
          <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase' }}>{route.mode}</p>
        </div>
        <div className="text-right">
          <p style={{ fontWeight: 700, fontSize: '0.82rem', color: C.emerald }}>{formatINR(route.price)}</p>
          <p style={{ fontSize: '0.62rem', color: trendColor, fontWeight: 600 }}>{trendLabel}</p>
        </div>
      </div>
      {/* Sparkline */}
      <div className="flex items-end gap-px" style={{ height: 28 }}>
        {bars.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${Math.round((v / max) * 100)}%`,
              background: i === 6 ? trendColor : `rgba(80,200,120,0.35)`,
              transition: 'height 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, sub }: { label: string; value: string; icon: string; sub?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl p-4 flex flex-col gap-1"
      style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
    >
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 700, color: C.mint }}>{value}</p>
      <p style={{ fontSize: '0.7rem', color: C.textSub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      {sub && <p style={{ fontSize: '0.62rem', color: C.textDim }}>{sub}</p>}
    </motion.div>
  );
}

function RecommendationCard({ rec, index }: { rec: any; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="rounded-2xl p-4 cursor-pointer"
      style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
      onClick={() => navigate('/plan-trip')}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', fontWeight: 700, color: C.mint }}>{rec.destination}</p>
          <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{rec.transportMode} · {rec.durationDays} days</p>
        </div>
        <div className="shrink-0 rounded-lg px-2 py-1 text-center" style={{ background: 'rgba(80,200,120,0.12)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: C.emerald }}>{formatINR(rec.totalCost)}</p>
        </div>
      </div>
      <p style={{ fontSize: '0.72rem', color: C.textSub, lineHeight: 1.5 }}>{rec.similarBecause}</p>
      {rec.highlights?.slice(0, 2).map((h: string, i: number) => (
        <p key={i} style={{ fontSize: '0.65rem', color: C.textDim, marginTop: 2 }}>• {h}</p>
      ))}
    </motion.div>
  );
}

function AlternativeCard({ alt, index }: { alt: any; index: number }) {
  const navigate = useNavigate();
  const typeColors: Record<string, string> = {
    stay_upgrade:    '#a78bfa',
    transport_swap:  '#60a5fa',
    budget_version:  C.emerald,
  };
  const color = typeColors[alt.alternativeType] || C.emerald;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl p-3 cursor-pointer"
      style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
      onClick={() => navigate('/plan-trip')}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.mint, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {alt.source} → {alt.destination}
          </p>
          <p style={{ fontSize: '0.63rem', color: C.textDim }}>{alt.similarBecause}</p>
        </div>
        <div className="shrink-0 text-right">
          <p style={{ fontWeight: 700, fontSize: '0.78rem', color }}>{formatINR(alt.totalCost)}</p>
          <p style={{ fontSize: '0.6rem', color: C.textDim }}>via {alt.transportMode}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ title, icon, children, action }: { title: string; icon: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.95rem', fontWeight: 700, color: C.mint, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{icon}</span> {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

// ── Budget allocation mini-widget ──────────────────────────────────────────
function BudgetWidget({ budget }: { budget: number }) {
  const [allocation, setAllocation] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (budget <= 0) return;
    setLoading(true);
    fetch('http://localhost:8001/budget-allocation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remaining_budget: budget, context: { days: 4, tier: 'comfort' } }),
    })
      .then(r => r.json())
      .then(d => setAllocation(d.allocations))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [budget]);

  const categories: Record<string, { icon: string; label: string; color: string }> = {
    experience:      { icon: '🎯', label: 'Experiences',     color: '#f59e0b' },
    local_transport: { icon: '🚗', label: 'Local Transport', color: '#60a5fa' },
    meals:           { icon: '🍽️', label: 'Dining',          color: '#34d399' },
    stay_upgrade:    { icon: '🏨', label: 'Stay Upgrade',    color: '#a78bfa' },
  };

  if (budget <= 0) return null;

  return (
    <div className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
      <div className="flex items-center justify-between mb-3">
        <p style={{ fontSize: '0.72rem', color: C.textSub, fontWeight: 600 }}>Discretionary budget of {formatINR(budget)}</p>
        {loading && <div className="w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />}
      </div>
      {allocation ? (
        <div className="space-y-2">
          {Object.entries(allocation).map(([arm, amount]) => {
            const meta = categories[arm] || { icon: '•', label: arm, color: C.emerald };
            const pct = budget > 0 ? Math.round((amount / budget) * 100) : 0;
            return (
              <div key={arm}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: '0.72rem', color: C.textSub }}>{meta.icon} {meta.label}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: meta.color }}>{formatINR(amount)} ({pct}%)</span>
                </div>
                <div className="w-full rounded-full" style={{ height: 4, background: 'rgba(80,200,120,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: meta.color, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : !loading ? (
        <p style={{ fontSize: '0.72rem', color: C.textDim }}>ML allocation service offline — connect the ml-service to see budget breakdown.</p>
      ) : null}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [savedTrips, setSavedTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'insights'>('overview');

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const tripsRes = await fetch('/api/user/trips', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tripsData = tripsRes.ok ? await tripsRes.json() : { data: [] };
      const trips = tripsData.data || [];
      setSavedTrips(trips);

      // ML recommendations
      try {
        const rec = await tripsAPI.getRecommendations();
        setRecommendations(rec.data || []);
      } catch {
        setRecommendations([]);
      }

      // Alternatives for the first saved trip (or dummy plan)
      try {
        const planForAlts = trips[0] || {
          destination: { name: 'Goa' }, source: { name: 'Mumbai' }, travelers: 2,
        };
        const altRes = await fetch('http://localhost:8001/alternatives', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ current_plan: planForAlts }),
        });
        if (altRes.ok) {
          const altData = await altRes.json();
          setAlternatives(altData.recommendations || []);
        }
      } catch {
        setAlternatives([]);
      }
    } catch {
      // Silently degrade
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalSaved  = savedTrips.length;
  const totalSpend  = savedTrips.reduce((s, t) => s + (t.selectedPlan?.totalCost || 0), 0);
  const avgBudget   = totalSaved > 0 ? Math.round(totalSpend / totalSaved) : 0;
  const remainingBudget = avgBudget > 0 ? Math.round(avgBudget * 0.12) : 3500; // hypothetical post-trip surplus

  const tabs = [
    { id: 'overview'         as const, label: 'Overview',        icon: '🏠' },
    { id: 'recommendations'  as const, label: 'For You',         icon: '✨' },
    { id: 'insights'         as const, label: 'Insights',        icon: '📊' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen"
      style={{ background: C.bg, color: C.textMain, fontFamily: '"Playfair Display", Georgia, serif' }}
    >
      <Navigation />

      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <div
        className="relative pt-16 pb-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #013220 0%, #0B6E4F 50%, rgba(80,200,120,0.15) 100%)`,
          minHeight: 220,
        }}
      >
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 100 + i * 60,
                height: 100 + i * 60,
                background: `rgba(80,200,120,${0.03 + i * 0.01})`,
                border: `1px solid rgba(80,200,120,${0.06 + i * 0.01})`,
                top: `${-20 + i * 15}%`,
                right: `${-10 + i * 8}%`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-8 pb-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p style={{ fontSize: '0.68rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 700, color: C.mint, lineHeight: 1.1, marginBottom: 6 }}>
                {greeting}, {user?.name?.split(' ')[0] || 'Traveller'} 👋
              </h1>
              <p style={{ fontSize: '0.85rem', color: C.textSub, maxWidth: 440 }}>
                Your personalized travel intelligence dashboard — recommendations, price trends, and smart budget allocation powered by ML.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: '✈️ Plan Trip',   href: '/plan-trip'   },
                { label: '📋 Saved Trips', href: '/saved-trips' },
                { label: '👤 Profile',     href: '/profile'     },
              ].map(a => (
                <Link
                  key={a.href}
                  to={a.href}
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: C.bg,
                    background: C.emerald,
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'background 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#3db86a'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.emerald}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats row */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
            >
              <StatCard label="Saved Trips"     value={String(totalSaved)}             icon="🗺️"  sub="in your library" />
              <StatCard label="Total Invested"  value={totalSpend > 0 ? formatINR(totalSpend) : '₹—'} icon="💰" sub="across all trips" />
              <StatCard label="Avg Trip Budget" value={avgBudget > 0 ? formatINR(avgBudget) : '₹—'} icon="📊" sub="per trip" />
              <StatCard label="ML Picks"        value={String(recommendations.length)} icon="🤖"  sub="curated for you" />
            </motion.div>
          )}
        </div>

        {/* Tab bar */}
        <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="flex gap-1 mt-2" style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  color:       activeTab === tab.id ? C.emerald : C.textDim,
                  borderBottom: activeTab === tab.id ? `2px solid ${C.emerald}` : '2px solid transparent',
                  background:  'transparent',
                  border:      'none',
                  cursor:      'pointer',
                  fontFamily:  '"Playfair Display", serif',
                  letterSpacing: '0.08em',
                  fontSize:    '0.72rem',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Left col: 2/3 */}
              <div className="md:col-span-2 space-y-6">

                {/* Quick plan CTA */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="rounded-3xl p-6 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, #0B6E4F 0%, #013220 100%)`,
                    border: `1px solid ${C.cardBorder}`,
                  }}
                  onClick={() => navigate('/plan-trip')}
                >
                  <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    AI Trip Planner
                  </p>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: C.mint, marginBottom: 8 }}>
                    Where to next?
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: C.textSub, marginBottom: 16, maxWidth: 360 }}>
                    Tell us your destination, budget, and dates — our DFS algorithm generates multiple plans in seconds.
                  </p>
                  <button
                    style={{
                      background: C.emerald, color: C.bg,
                      border: 'none', borderRadius: '9999px',
                      padding: '10px 24px', fontWeight: 700, fontSize: '0.8rem',
                      cursor: 'pointer', fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    Start Planning →
                  </button>
                </motion.div>

                {/* Inspiration grid */}
                <Section title="Inspire Your Next Trip" icon="🌏">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {INSPIRATION.map((dest, i) => (
                      <motion.div
                        key={dest.city}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        className="relative rounded-xl overflow-hidden cursor-pointer"
                        style={{ aspectRatio: '4/3' }}
                        onClick={() => navigate('/plan-trip')}
                      >
                        <img
                          src={dest.img}
                          alt={dest.city}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(1,50,32,0.92) 0%, rgba(1,50,32,0.1) 60%)' }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '0.9rem', color: C.mint }}>{dest.city}</p>
                          <p style={{ fontSize: '0.62rem', color: C.textSub }}>{dest.tagline}</p>
                          <p style={{ fontSize: '0.6rem', color: C.emerald, fontWeight: 600, marginTop: 2 }}>{dest.budget}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Section>

                {/* Travel tips */}
                <Section title="Smart Travel Tips" icon="💡">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {TIPS.map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="rounded-xl p-4"
                        style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
                      >
                        <p style={{ fontSize: '1.3rem', marginBottom: 6 }}>{tip.icon}</p>
                        <p style={{ fontWeight: 700, fontSize: '0.8rem', color: C.mint, marginBottom: 4 }}>{tip.title}</p>
                        <p style={{ fontSize: '0.7rem', color: C.textSub, lineHeight: 1.5 }}>{tip.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Right col: 1/3 */}
              <div className="space-y-5">

                {/* Saved trips quick view */}
                <Section title="Saved Trips" icon="📋" action={
                  <Link to="/saved-trips" style={{ fontSize: '0.68rem', color: C.emerald, textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
                }>
                  {loading ? (
                    <div className="space-y-2">
                      {[1,2].map(i => (
                        <div key={i} className="rounded-xl h-16 animate-pulse" style={{ background: C.card }} />
                      ))}
                    </div>
                  ) : savedTrips.length === 0 ? (
                    <div className="rounded-xl p-4 text-center" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                      <p style={{ fontSize: '1.5rem', marginBottom: 6 }}>🗺️</p>
                      <p style={{ fontSize: '0.75rem', color: C.textSub }}>No saved trips yet.</p>
                      <button
                        onClick={() => navigate('/plan-trip')}
                        style={{ marginTop: 8, fontSize: '0.72rem', color: C.emerald, background: 'transparent', border: `1px solid ${C.emerald}`, borderRadius: '9999px', padding: '4px 12px', cursor: 'pointer', fontFamily: '"Playfair Display", serif' }}
                      >
                        Plan one now
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {savedTrips.slice(0, 3).map((trip, i) => (
                        <motion.div
                          key={trip._id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.02 }}
                          className="rounded-xl p-3 cursor-pointer"
                          style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
                          onClick={() => navigate(`/saved-trips/${trip._id}`)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.mint, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {trip.source} → {trip.destination}
                              </p>
                              <p style={{ fontSize: '0.62rem', color: C.textDim }}>{trip.travelers} traveller{trip.travelers !== 1 ? 's' : ''}</p>
                            </div>
                            <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.emerald, flexShrink: 0 }}>
                              {formatINR(trip.selectedPlan?.totalCost || 0)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </Section>

                {/* Budget allocation widget */}
                <Section title="Post-Trip Budget AI" icon="🤖">
                  <p style={{ fontSize: '0.68rem', color: C.textDim, marginBottom: 8 }}>
                    Q-Learning model allocates your remaining budget for maximum satisfaction.
                  </p>
                  <BudgetWidget budget={remainingBudget} />
                </Section>

                {/* Price trends */}
                <Section title="Price Trends" icon="📈" action={
                  <span style={{ fontSize: '0.62rem', color: C.textDim }}>XGBoost forecast</span>
                }>
                  <div className="space-y-2">
                    {POPULAR_ROUTES.slice(0, 4).map((r, i) => (
                      <PriceTrendBar key={i} route={r} />
                    ))}
                  </div>
                </Section>
              </div>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* ML Recommendations */}
              <div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Hybrid ML model · cosine + popularity + budget proximity</p>
                    <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', fontWeight: 700, color: C.mint }}>
                      Curated Just For You
                    </h2>
                  </div>
                  <button
                    onClick={fetchData}
                    style={{ fontSize: '0.7rem', color: C.emerald, background: 'transparent', border: `1px solid ${C.cardBorder}`, borderRadius: '9999px', padding: '5px 14px', cursor: 'pointer', fontFamily: '"Playfair Display", serif' }}
                  >
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1,2,3].map(i => <div key={i} className="rounded-2xl h-32 animate-pulse" style={{ background: C.card }} />)}
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="rounded-2xl p-8 text-center" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                    <p style={{ fontSize: '2rem', marginBottom: 8 }}>🤖</p>
                    <p style={{ color: C.textSub, fontSize: '0.85rem' }}>Save more trips to get personalised ML recommendations.</p>
                    <button
                      onClick={() => navigate('/plan-trip')}
                      style={{ marginTop: 12, background: C.emerald, color: C.bg, border: 'none', borderRadius: '9999px', padding: '8px 20px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      Plan a trip
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map((rec, i) => <RecommendationCard key={rec._id} rec={rec} index={i} />)}
                  </div>
                )}
              </div>

              {/* Alternatives */}
              {alternatives.length > 0 && (
                <div>
                  <div className="mb-4">
                    <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Based on your last saved trip</p>
                    <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', fontWeight: 700, color: C.mint }}>
                      You Might Also Consider
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {alternatives.map((alt, i) => <AlternativeCard key={alt._id} alt={alt} index={i} />)}
                  </div>
                </div>
              )}

              {/* Inspiration grid */}
              <div>
                <div className="mb-4">
                  <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Handpicked for Indian travellers</p>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', fontWeight: 700, color: C.mint }}>
                    Trending Destinations
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {INSPIRATION.map((dest, i) => (
                    <motion.div
                      key={dest.city}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="relative rounded-xl overflow-hidden cursor-pointer"
                      style={{ aspectRatio: '3/4' }}
                      onClick={() => navigate('/plan-trip')}
                    >
                      <img src={dest.img} alt={dest.city} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(1,50,32,0.92) 0%, rgba(1,50,32,0.05) 55%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '0.82rem', color: C.mint }}>{dest.city}</p>
                        <p style={{ fontSize: '0.58rem', color: C.emerald, fontWeight: 600 }}>{dest.budget}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Price forecasts */}
              <div className="space-y-4">
                <div>
                  <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>XGBoost gradient boosting model</p>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint }}>
                    Fare Trend Forecasts
                  </h2>
                </div>
                <div className="space-y-3">
                  {POPULAR_ROUTES.map((r, i) => (
                    <PriceTrendBar key={i} route={r} />
                  ))}
                </div>
                <div className="rounded-xl p-3" style={{ background: 'rgba(80,200,120,0.05)', border: `1px solid ${C.cardBorder}` }}>
                  <p style={{ fontSize: '0.68rem', color: C.textDim, lineHeight: 1.6 }}>
                    📌 Forecasts use an XGBoost ensemble with features: days-to-departure, transport mode, seasonal pressure, booking-urgency, and historical slope. Confidence improves with fare history data.
                  </p>
                </div>
              </div>

              {/* Budget AI */}
              <div className="space-y-4">
                <div>
                  <p style={{ fontSize: '0.65rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Tabular Q-Learning RL model (ε-greedy)</p>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint }}>
                    Smart Budget Allocation
                  </h2>
                </div>

                {/* Interactive budget slider */}
                <BudgetAllocationExplorer />

                <div className="rounded-xl p-3" style={{ background: 'rgba(80,200,120,0.05)', border: `1px solid ${C.cardBorder}` }}>
                  <p style={{ fontSize: '0.68rem', color: C.textDim, lineHeight: 1.6 }}>
                    🧠 State: (budget_band × days_band × comfort_level). Action: 4 spending categories. Reward: your satisfaction feedback (0-1). Q-table updates via Bellman equation after each feedback signal.
                  </p>
                </div>
              </div>

              {/* Travel tips */}
              <div className="md:col-span-2">
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint, marginBottom: 12 }}>
                  💡 Smart Travel Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl p-4"
                      style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
                    >
                      <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>{tip.icon}</p>
                      <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.mint, marginBottom: 4 }}>{tip.title}</p>
                      <p style={{ fontSize: '0.68rem', color: C.textSub, lineHeight: 1.5 }}>{tip.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Budget Allocation Explorer (interactive) ───────────────────────────────
function BudgetAllocationExplorer() {
  const [budget, setBudget] = useState(5000);
  const [allocation, setAllocation] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch_allocation = async (b: number) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8001/budget-allocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remaining_budget: b, context: { days: 4, tier: 'comfort' } }),
      });
      if (res.ok) {
        const d = await res.json();
        setAllocation(d.allocations);
      }
    } catch { setAllocation(null); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch_allocation(budget); }, [budget]);

  const categories: Record<string, { icon: string; color: string }> = {
    experience:      { icon: '🎯', color: '#f59e0b' },
    local_transport: { icon: '🚗', color: '#60a5fa' },
    meals:           { icon: '🍽️', color: '#34d399' },
    stay_upgrade:    { icon: '🏨', color: '#a78bfa' },
  };

  return (
    <div className="rounded-2xl p-4 space-y-4" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label style={{ fontSize: '0.72rem', color: C.textSub, fontWeight: 600 }}>Remaining Budget</label>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: C.emerald }}>{formatINR(budget)}</span>
        </div>
        <input
          type="range"
          min={500}
          max={25000}
          step={500}
          value={budget}
          onChange={e => setBudget(Number(e.target.value))}
          style={{ width: '100%', accentColor: C.emerald }}
        />
        <div className="flex justify-between" style={{ fontSize: '0.6rem', color: C.textDim, marginTop: 2 }}>
          <span>₹500</span><span>₹25,000</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2" style={{ color: C.textDim, fontSize: '0.72rem' }}>
          <div className="w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          Computing allocation…
        </div>
      ) : allocation ? (
        <div className="space-y-2.5">
          {Object.entries(allocation).map(([arm, amount]) => {
            const meta = categories[arm] || { icon: '•', color: C.emerald };
            const pct = budget > 0 ? Math.round((amount / budget) * 100) : 0;
            return (
              <div key={arm}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: '0.72rem', color: C.textSub }}>{meta.icon} {arm.replace('_', ' ')}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: meta.color }}>{formatINR(amount)} ({pct}%)</span>
                </div>
                <div className="w-full rounded-full" style={{ height: 5, background: 'rgba(80,200,120,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ background: meta.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ fontSize: '0.72rem', color: C.textDim }}>ML service offline — run ml-service to see live allocation.</p>
      )}
    </div>
  );
}
