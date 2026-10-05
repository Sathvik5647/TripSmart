"""Tabular Q-Learning for post-booking budget allocation.

Architecture
============
State  : (budget_band, days_in_trip, comfort_level)
           budget_band   : 0-4  (< ₹1k | 1-3k | 3-6k | 6-15k | > ₹15k)
           days_in_trip  : 0-3  (1 | 2-3 | 4-7 | 8+)
           comfort_level : 0-2  (budget | mid | premium)  derived from context
Actions: 4 arms  — experience | local_transport | meals | stay_upgrade
Reward : 0-1 feedback from user (via /budget-feedback endpoint)

Bellman update:
  Q(s, a) ← Q(s, a) + α · [r + γ · max_a' Q(s', a') − Q(s, a)]

Cold-start: Q-table initialised from preference priors so first
allocation is always sensible even before any feedback.

The module is intentionally stateless-at-import: the Q-table lives
in the module-level dict and survives for the server lifetime.
"""

from __future__ import annotations
from math import log, sqrt
import random

# ── Hyper-parameters ───────────────────────────────────────────────────────
ALPHA   = 0.15    # learning rate
GAMMA   = 0.80    # discount factor
EPS_MAX = 0.22    # initial ε for ε-greedy exploration
EPS_MIN = 0.04    # floor ε (reached after ~1000 feedback calls)
EPS_DECAY = 0.997 # per-feedback step decay

ARMS = ("experience", "local_transport", "meals", "stay_upgrade")
ALLOCATION_WEIGHTS = [0.42, 0.28, 0.18, 0.12]  # for ranked arms

# ── State discretisation ───────────────────────────────────────────────────

def _budget_band(remaining: float) -> int:
    if remaining < 1_000:  return 0
    if remaining < 3_000:  return 1
    if remaining < 6_000:  return 2
    if remaining < 15_000: return 3
    return 4

def _days_band(ctx: dict) -> int:
    days = int(ctx.get("trip_duration_days") or ctx.get("days") or 3)
    if days <= 1:  return 0
    if days <= 3:  return 1
    if days <= 7:  return 2
    return 3

def _comfort_level(ctx: dict) -> int:
    tier = str(ctx.get("tier") or ctx.get("trip_tier") or "mid").lower()
    if "budget" in tier or "cheap" in tier: return 0
    if "premium" in tier or "luxury" in tier: return 2
    return 1

def _state(remaining: float, ctx: dict) -> tuple[int, int, int]:
    return (_budget_band(remaining), _days_band(ctx), _comfort_level(ctx))

# ── Q-table ────────────────────────────────────────────────────────────────
# Keys: (state_tuple, arm_index)
# Values: Q-value (float)

# Prior initialisation: gives sensible cold-start behaviour.
# Priors are learned-from-preference-weighted uniform scores.
_DEFAULT_Q: dict[tuple, float] = {}

def _init_q_table() -> dict[tuple, float]:
    q: dict[tuple, float] = {}
    # For each state, seed priors from intuition
    priors = {
        # (budget_band, days_band, comfort) → arm_priorities  [exp, local, meals, stay]
        (0, 0, 0): [0.30, 0.25, 0.35, 0.10],  # tight budget, day trip, budget tier
        (0, 1, 0): [0.25, 0.30, 0.35, 0.10],
        (0, 2, 0): [0.30, 0.25, 0.30, 0.15],
        (0, 3, 0): [0.30, 0.20, 0.30, 0.20],
        (1, 1, 1): [0.35, 0.25, 0.25, 0.15],
        (1, 2, 1): [0.38, 0.22, 0.22, 0.18],
        (2, 2, 1): [0.40, 0.20, 0.22, 0.18],
        (2, 3, 1): [0.38, 0.18, 0.20, 0.24],
        (3, 2, 2): [0.35, 0.15, 0.20, 0.30],
        (3, 3, 2): [0.30, 0.15, 0.20, 0.35],
        (4, 2, 2): [0.28, 0.12, 0.18, 0.42],
        (4, 3, 2): [0.25, 0.12, 0.18, 0.45],
    }
    default_prior = [0.35, 0.25, 0.22, 0.18]
    for bb in range(5):
        for db in range(4):
            for cl in range(3):
                s = (bb, db, cl)
                prior = priors.get(s, default_prior)
                for ai, arm in enumerate(ARMS):
                    q[(s, ai)] = prior[ai]
    return q

_Q: dict = _init_q_table()
_epsilon: float = EPS_MAX
_feedback_count: int = 0

# ── ε-greedy action selection ──────────────────────────────────────────────

def _q_values(s: tuple) -> list[float]:
    return [_Q.get((s, ai), 0.25) for ai in range(len(ARMS))]

def _greedy_arm(s: tuple, context: dict) -> list[int]:
    """Return arms ranked by Q-value, breaking ties with preference priors."""
    prefs = {
        "experience":     float(context.get("activity_priority",  0.5)),
        "local_transport":float(context.get("mobility_priority",  0.5)),
        "meals":          float(context.get("food_priority",      0.5)),
        "stay_upgrade":   float(context.get("comfort_priority",   0.5)),
    }
    qv = [(arm, _Q.get((s, ai), 0.25) + 0.01 * prefs[arm])
          for ai, arm in enumerate(ARMS)]
    qv.sort(key=lambda x: x[1], reverse=True)
    return [ARMS.index(arm) for arm, _ in qv]

# ── Last state tracking (needed for next-state Q update) ──────────────────
_last_state: tuple | None = None
_last_arm: int | None = None

# ── Public API ─────────────────────────────────────────────────────────────

def allocate_budget(remaining_budget: float, context: dict | None = None) -> dict:
    """Allocate discretionary funds using ε-greedy Q-Learning policy."""
    global _epsilon, _last_state, _last_arm

    context = context or {}
    remaining_budget = max(float(remaining_budget or 0), 0)

    # Emergency reserve (mandatory)
    reserve_rate   = 0.25 if remaining_budget < 3_000 else 0.18
    emergency_reserve = round(remaining_budget * reserve_rate)
    discretionary = max(0, remaining_budget - emergency_reserve)

    s = _state(discretionary, context)

    # ε-greedy: explore with probability ε
    if random.random() < _epsilon:
        arm_order = list(range(len(ARMS)))
        random.shuffle(arm_order)
        reason_prefix = "Exploring new allocation strategy"
    else:
        arm_order = _greedy_arm(s, context)
        reason_prefix = "Q-Learning recommendation"

    # Remember state/arm for Bellman update on next feedback
    _last_state = s
    _last_arm   = arm_order[0]   # primary arm chosen

    ranked_arms = [ARMS[i] for i in arm_order]
    allocation  = {
        arm: round(discretionary * weight)
        for arm, weight in zip(ranked_arms, ALLOCATION_WEIGHTS)
    }
    # Fix rounding drift
    allocation[ranked_arms[-1]] += discretionary - sum(allocation.values())

    suggestions = []
    arm_labels = {
        "experience":      "experiences & activities",
        "local_transport": "local transport",
        "meals":           "dining & meals",
        "stay_upgrade":    "accommodation upgrade",
    }
    for arm, amount in allocation.items():
        if amount > 0:
            q_val = _Q.get((s, ARMS.index(arm)), 0.25)
            suggestions.append({
                "category": arm,
                "amount":   amount,
                "reason":   (
                    f"{reason_prefix}: Q={q_val:.3f} — "
                    f"Invest in {arm_labels[arm]} for better trip satisfaction."
                ),
                "q_value": round(q_val, 4),
            })

    return {
        "model":                "tabular-q-learning-v1",
        "remaining_budget":     round(remaining_budget),
        "emergency_reserve":    emergency_reserve,
        "discretionary_budget": discretionary,
        "epsilon":              round(_epsilon, 4),
        "state":                {"budget_band": s[0], "days_band": s[1], "comfort": s[2]},
        "allocations":          allocation,
        "suggestions":          suggestions,
    }


def record_feedback(category: str, reward: float) -> dict:
    """Bellman Q-update on user feedback signal."""
    global _epsilon, _feedback_count, _last_state, _last_arm

    if category not in ARMS:
        raise ValueError(f"Unknown budget category: {category}. Valid: {ARMS}")

    reward = max(0.0, min(1.0, float(reward)))
    _feedback_count += 1

    # Decay ε
    _epsilon = max(EPS_MIN, EPS_MAX * (EPS_DECAY ** _feedback_count))

    arm_idx = ARMS.index(category)

    if _last_state is not None:
        s  = _last_state
        a  = arm_idx
        # Next state: assume same context (no additional info at feedback time)
        next_q_max = max(_Q.get((s, ai), 0.25) for ai in range(len(ARMS)))
        current_q  = _Q.get((s, a), 0.25)
        # Bellman update
        _Q[(s, a)] = current_q + ALPHA * (reward + GAMMA * next_q_max - current_q)
    else:
        # No state recorded (standalone feedback call) — simple reward update
        for s_key in list(_Q.keys()):
            if s_key[1] == arm_idx:
                _Q[s_key] = _Q[s_key] + ALPHA * (reward - _Q[s_key])

    return {
        "category":         category,
        "reward":           reward,
        "feedback_count":   _feedback_count,
        "epsilon":          round(_epsilon, 4),
        "updated_q_value":  round(_Q.get((_last_state, arm_idx), 0.25), 4) if _last_state else None,
    }
