"""Hybrid trip recommendation engine.

Scoring = content cosine similarity
         + popularity bonus (how often destination appears in corpus)
         + budget proximity (candidate's cost near user's typical spend)
         + seasonal affinity (departure month alignment)
         - diversity penalty (already-shown destination discounted)

Also exposes rank_alternatives(current_plan) for within-tier transport/hotel
swaps on the same route.
"""

from collections import Counter
from math import sqrt, exp
import datetime


# ── Helpers ────────────────────────────────────────────────────────────────

def _value(trip: dict, *path: str):
    current = trip
    for key in path:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def _budget_band(amount) -> str:
    try:
        v = float(amount or 0)
    except (TypeError, ValueError):
        v = 0
    if v < 10_000:  return "under-10k"
    if v < 20_000:  return "10-20k"
    if v < 40_000:  return "20-40k"
    if v < 80_000:  return "40-80k"
    return "80k+"


def _duration_band(trip: dict) -> str:
    days = _value(trip, "durationDays")
    if not days:
        days = _value(trip, "breakdown", "usableDays") or 1
    try:
        days = max(1, int(days))
    except (TypeError, ValueError):
        start = trip.get("startDate")
        end   = trip.get("endDate")
        try:
            from datetime import date
            days = max(1, (date.fromisoformat(str(end)[:10]) -
                           date.fromisoformat(str(start)[:10])).days + 1)
        except (TypeError, ValueError):
            days = 1
    return "1-2" if days <= 2 else "3-4" if days <= 4 else "5-7" if days <= 7 else "8+"


def _plan_cost(trip: dict) -> float:
    plan = (trip.get("plans") or [{}])[0]
    raw = _value(plan, "costs", "total") or _value(trip, "booking", "totalAmount") or 0
    try:
        return float(raw)
    except (TypeError, ValueError):
        return 0.0


def _departure_month(trip: dict) -> int:
    """Return departure month (1-12) or 0 if unknown."""
    raw = trip.get("startDate") or trip.get("departureDate") or ""
    try:
        return datetime.date.fromisoformat(str(raw)[:10]).month
    except (TypeError, ValueError):
        return 0


def _destination_name(trip: dict) -> str:
    return str(
        _value(trip, "destination", "name") or _value(trip, "destination") or ""
    ).lower().strip()


# ── Feature extraction ─────────────────────────────────────────────────────

def _features(trips: list[dict]) -> Counter:
    features: Counter = Counter()
    for trip in trips:
        source      = _value(trip, "source", "name") or _value(trip, "source") or "unknown"
        destination = _destination_name(trip)
        plan        = (trip.get("plans") or [{}])[0]
        total       = _plan_cost(trip)
        mode        = (
            _value(plan, "transport", "mode") or
            _value(plan, "transportDetails", "mode") or "mixed"
        )
        features.update({
            f"source:{str(source).lower()}":     1,
            f"destination:{destination}":         1,
            f"budget:{_budget_band(total)}":      1,
            f"duration:{_duration_band(trip)}":   1,
            f"transport:{str(mode).lower()}":     1,
            f"travelers:{min(int(trip.get('travelers') or 1), 4)}": 1,
            f"tripType:{trip.get('tripType') or 'direct'}": 1,
        })
        preferences = trip.get("preferences") or {}
        for interest in (preferences.get("interests") or []):
            features[f"interest:{str(interest).lower()}"] += 1
        m = _departure_month(trip)
        if m:
            features[f"month:{m}"] += 1
    return features


def _cosine(left: Counter, right: Counter) -> float:
    keys       = set(left) | set(right)
    dot        = sum(left[k] * right[k] for k in keys)
    left_norm  = sqrt(sum(v * v for v in left.values()))
    right_norm = sqrt(sum(v * v for v in right.values()))
    return dot / (left_norm * right_norm) if left_norm and right_norm else 0.0


# ── Popularity index ────────────────────────────────────────────────────────

def _build_popularity(candidates: list[dict]) -> dict[str, float]:
    """Normalised popularity per destination (0-1)."""
    counts: Counter = Counter(_destination_name(c) for c in candidates)
    if not counts:
        return {}
    max_count = max(counts.values())
    return {dest: count / max_count for dest, count in counts.items()}


# ── Budget proximity (Gaussian kernel) ────────────────────────────────────

def _budget_proximity(user_typical_cost: float, candidate_cost: float) -> float:
    """Returns 1 if identical budget, decays with distance (sigma ≈ 30 % of user spend)."""
    if user_typical_cost <= 0:
        return 0.5
    sigma = max(user_typical_cost * 0.30, 2000)
    return exp(-0.5 * ((candidate_cost - user_typical_cost) / sigma) ** 2)


# ── Seasonal affinity ──────────────────────────────────────────────────────

def _seasonal_affinity(user_months: Counter, candidate_month: int) -> float:
    """How much the candidate's travel month matches user's past travel months."""
    if not user_months or candidate_month == 0:
        return 0.5
    total = sum(user_months.values())
    return user_months.get(candidate_month, 0) / total


# ── Format helpers ─────────────────────────────────────────────────────────

def _format_candidate(trip: dict, similarity: float, reason: str) -> dict:
    plan = (trip.get("plans") or [{}])[0]
    return {
        "_id":           str(trip.get("_id") or trip.get("id")),
        "source":        _value(trip, "source", "name") or _value(trip, "source"),
        "destination":   _value(trip, "destination", "name") or _value(trip, "destination"),
        "startDate":     trip.get("startDate"),
        "endDate":       trip.get("endDate"),
        "travelers":     trip.get("travelers") or 1,
        "durationDays":  _duration_band(trip),
        "transportMode": (
            _value(plan, "transport", "mode") or
            _value(plan, "transportDetails", "mode") or "mixed"
        ),
        "totalCost":     _plan_cost(trip),
        "highlights":    plan.get("highlights") or [],
        "similarBecause": reason,
        "similarity":    round(similarity, 4),
    }


# ── Public API ─────────────────────────────────────────────────────────────

def rank_recommendations(
    user_trips: list[dict],
    candidates: list[dict],
    limit: int = 6,
) -> list[dict]:
    """Hybrid ranking: content similarity + popularity + budget proximity + seasonal."""

    # --- Build user profile ---
    user_features     = _features(user_trips)
    user_costs        = [_plan_cost(t) for t in user_trips if _plan_cost(t) > 0]
    user_typical_cost = sum(user_costs) / len(user_costs) if user_costs else 0
    user_months: Counter = Counter()
    for t in user_trips:
        m = _departure_month(t)
        if m:
            user_months[m] += 1

    # Exclude destinations already visited
    seen_destinations = {_destination_name(t) for t in user_trips}

    # Popularity index over candidate pool
    popularity = _build_popularity(candidates)

    # --- Score each candidate ---
    scored: list[tuple[float, dict]] = []
    shown_destinations: set[str] = set()

    for candidate in candidates:
        dest = _destination_name(candidate)
        if dest in seen_destinations:
            continue

        cand_features = _features([candidate])
        cand_cost     = _plan_cost(candidate)
        cand_month    = _departure_month(candidate)

        sim       = _cosine(user_features, cand_features)           # 0-1
        pop       = popularity.get(dest, 0.0)                       # 0-1
        budget_p  = _budget_proximity(user_typical_cost, cand_cost) # 0-1
        seasonal  = _seasonal_affinity(user_months, cand_month)     # 0-1

        # Diversity penalty: halve score if same destination already queued
        diversity = 0.5 if dest in shown_destinations else 1.0

        # Weighted composite score
        score = (
            0.45 * sim      +
            0.20 * pop      +
            0.20 * budget_p +
            0.15 * seasonal
        ) * diversity

        shown_destinations.add(dest)

        # Human-readable reason
        if sim > 0.6:
            reason = f"Strongly matches your travel profile ({round(sim * 100)}% similarity)"
        elif pop > 0.6:
            reason = "Popular destination among travellers like you"
        elif budget_p > 0.7:
            reason = f"Fits your typical spend of ₹{round(user_typical_cost):,}"
        elif seasonal > 0.5:
            reason = "Great time of year based on your travel patterns"
        else:
            reason = f"Matches your travel profile ({round(score * 100)}% match)"

        scored.append((score, candidate, reason))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [
        _format_candidate(candidate, score, reason)
        for score, candidate, reason in scored[:limit]
    ]


def rank_alternatives(current_plan: dict) -> list[dict]:
    """
    Given a current trip plan, synthesise plausible alternative plan cards
    (different transport tier, accommodation tier) on the same route.

    This is useful for the "You might also like" section after selecting a plan.
    No external data is needed — we derive alternatives from the plan itself.
    """
    plan      = (current_plan.get("plans") or [current_plan])[0]
    base_cost = _plan_cost(current_plan) or float(plan.get("totalCost") or 0)
    dest      = (
        _value(current_plan, "destination", "name") or
        _value(current_plan, "destination") or
        "Destination"
    )
    source    = (
        _value(current_plan, "source", "name") or
        _value(current_plan, "source") or
        "Origin"
    )
    transport_mode = (
        _value(plan, "transport", "mode") or
        _value(plan, "transportDetails", "mode") or "flight"
    )
    tier = (plan.get("tier") or "Comfort").lower()

    alternatives = []

    # Alternative 1 — upgrade accommodation, same transport
    if tier != "premium":
        alt_cost = round(base_cost * 1.22)
        alternatives.append({
            "_id":           f"alt-stay-upgrade-{dest}",
            "source":        source,
            "destination":   dest,
            "startDate":     current_plan.get("startDate"),
            "endDate":       current_plan.get("endDate"),
            "travelers":     current_plan.get("travelers") or 1,
            "durationDays":  _duration_band(current_plan),
            "transportMode": transport_mode,
            "totalCost":     alt_cost,
            "highlights":    ["Upgraded accommodation", "Same route & dates", "Better amenities"],
            "similarBecause": "Same trip with a premium stay — ~22% more for much more comfort",
            "similarity":    0.90,
            "alternativeType": "stay_upgrade",
        })

    # Alternative 2 — switch transport mode
    alt_mode = "train" if transport_mode == "flight" else "flight"
    transport_delta = -0.18 if alt_mode == "train" else 0.25
    alt_cost2 = round(base_cost * (1 + transport_delta))
    if alt_cost2 > 0:
        label = "train — slower but scenic & cheaper" if alt_mode == "train" else "flight — faster but pricier"
        alternatives.append({
            "_id":           f"alt-transport-{alt_mode}-{dest}",
            "source":        source,
            "destination":   dest,
            "startDate":     current_plan.get("startDate"),
            "endDate":       current_plan.get("endDate"),
            "travelers":     current_plan.get("travelers") or 1,
            "durationDays":  _duration_band(current_plan),
            "transportMode": alt_mode,
            "totalCost":     alt_cost2,
            "highlights":    [f"By {alt_mode}", "Same destination & hotel tier"],
            "similarBecause": f"Same trip by {label}",
            "similarity":    0.80,
            "alternativeType": "transport_swap",
        })

    # Alternative 3 — budget version (downgrade one tier)
    if tier != "budget":
        alt_cost3 = round(base_cost * 0.72)
        alternatives.append({
            "_id":           f"alt-budget-{dest}",
            "source":        source,
            "destination":   dest,
            "startDate":     current_plan.get("startDate"),
            "endDate":       current_plan.get("endDate"),
            "travelers":     current_plan.get("travelers") or 1,
            "durationDays":  _duration_band(current_plan),
            "transportMode": transport_mode,
            "totalCost":     alt_cost3,
            "highlights":    ["Budget accommodation", "Same transport", "Save ~28%"],
            "similarBecause": "Same experience, lower cost — ideal if budget is tight",
            "similarity":    0.75,
            "alternativeType": "budget_version",
        })

    return alternatives