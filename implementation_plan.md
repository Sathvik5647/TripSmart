# TripSmart ML Service Upgrade + Dashboard + Saved Trips Fix

## Summary

Six distinct tasks across ML service, frontend UI, and backend data filtering:

1. **Fix ImportError** — `rank_alternatives` missing from `recommender.py`
2. **Upgrade recommender.py** — best model for trip recommendations
3. **Upgrade budget_allocator.py** — Q-Learning (tabular) for RL-based post-payment budget allocation
4. **Upgrade price_forecaster.py** — XGBoost-style gradient boosting (pure-Python, no sklearn dependency)
5. **Create Dashboard page** — Personalized user dashboard with ML recommendations
6. **Fix Saved Trips filter** — Only show trips with `booking.status === 'saved'` (explicit save)
7. **Redesign Saved Trip Detail page** — Match the TripDetailsPage green emerald design

---

## Analysis

### 1. ImportError Fix
`app.py` imports `rank_alternatives` from `recommender.py`, but that function doesn't exist. Need to add it.

### 2. Recommender Model Analysis
Current: Cosine similarity on hand-crafted feature counters (pure content-based).

**Best model for trip recommendations without heavy ML deps:**
- **Content-based filtering** (current, works) — good for cold start
- **Collaborative filtering** — needs user history → no MongoDB query here
- **Hybrid approach** = content features + popularity scoring + diversity penalty

**Recommended: Hybrid Content + Popularity + Novelty re-ranking** — gives much better recommendations than pure cosine. We'll add:
  - Popularity score (how often a destination appears in user corpus)  
  - Seasonal affinity (departure month alignment)
  - Budget proximity scoring (how close the candidate is to user's typical budget)
  - Diversity penalty (don't return 6 variations of the same destination)
  - `rank_alternatives(current_plan)` — find similar transport tier options for the current plan

### 3. Q-Learning for Budget Allocation
Current: Contextual bandit with UCB1. The system design says Q-Learning.

**Q-Learning design:**
- **State**: `(budget_band, days_remaining, trip_type, satisfaction_level)` → discretized
- **Actions**: 4 categories (`experience`, `local_transport`, `meals`, `stay_upgrade`)
- **Reward**: user feedback signal (0–1)  
- **Q-table**: in-memory dict (will persist between requests, reset on server restart)
- **ε-greedy exploration**: ε=0.2 decaying to 0.05
- **Bellman update**: `Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',a') - Q(s,a)]`
- Keep UCB fallback for cold-start (no Q-table state yet)

### 4. XGBoost Price Forecaster
Current: Linear regression on fare history + hand-crafted priors.

**XGBoost-style implementation** (pure Python, no scikit-learn):
- Gradient boosting with decision tree stumps
- Features: `[days_until_departure, transport_mode_encoded, seasonal_index, day_of_week, demand_proxy]`
- We'll ship a **pre-seeded synthetic model** with bootstrapped residuals → no training data needed
- Falls back gracefully to the existing prior-based forecaster if history < 3 points

### 5. Dashboard Page
A rich personalized dashboard at `/dashboard` route:
- **ML Recommendations panel** — calls `/api/trips/recommendations` → forwarded to ML service
- **Budget allocation widget** — post-payment spending suggestions
- **Price trend chart** — small sparkline of fare trend for common routes
- **Quick stats** — saved trips, total spent, favorite destinations
- **Quick actions** — Plan New Trip, View Saved
- Emerald dark theme matching the rest of the app

### 6. Saved Trips Filter Fix
The backend returns ALL trips for the user (any status). The `MyTripsPage.tsx` already filters `savedTrips = trips.filter(t => t.status === 'saved')`, but the user says it shows all trips.

**Root cause:** The backend `/api/user/trips` fallback is `status: trip.booking?.status || 'saved'` — so trips without an explicit `booking.status` field get labelled `'saved'` even if they were auto-generated (not user-saved). We need to ensure only explicitly user-saved trips appear.

**Fix:** 
- Backend: only include trips where `booking.status === 'saved'` OR `booking.status` is explicitly set
- The real fix: when a user generates a trip (POST /trips/plan), the trip should NOT be saved to MongoDB with status='saved'. Only `/trips/save` should do that.
- Check if trips are being auto-saved on plan generation.

### 7. SavedTripDetailPage Redesign
Redesign `SavedTripDetailPage.tsx` to match TripDetailsPage's emerald dark design system (2-column layout, green glass cards, timeline itinerary, emerald palette).

---

## Proposed Changes

### ML Service

#### [MODIFY] [recommender.py](file:///d:/TripSmart/ml-service/recommender.py)
- Add `rank_alternatives(current_plan)` function (fixes ImportError)  
- Upgrade `rank_recommendations` to hybrid scoring: content cosine + popularity bonus + budget proximity + seasonal match + diversity penalty

#### [MODIFY] [budget_allocator.py](file:///d:/TripSmart/ml-service/budget_allocator.py)
- Replace UCB1 bandit with tabular Q-Learning
- State: `(budget_band, days_in_trip, comfort_level)` discretized
- ε-greedy action selection
- Bellman Q-update in `record_feedback`
- Keep same API surface (no breaking changes to `app.py`)

#### [MODIFY] [price_forecaster.py](file:///d:/TripSmart/ml-service/price_forecaster.py)
- Add XGBoost-style gradient boosting with decision tree stumps
- Pre-seeded with 5 synthetic boosting rounds calibrated to Indian airline/train data
- Feature engineering: days_until, mode_index, seasonal_pressure, urgency_band
- Gracefully falls back to prior-based forecast when history is sparse

#### [MODIFY] [requirements.txt](file:///d:/TripSmart/ml-service/requirements.txt)
- Add `numpy` (lightweight, enables vectorized operations for XGBoost)

---

### Backend

#### [MODIFY] [trips.js](file:///d:/TripSmart/backend/src/routes/trips.js)
- Investigate whether `POST /trips/plan` auto-saves to MongoDB (it should NOT set status='saved')
- If it does, change auto-save status to `'draft'` not `'saved'`

#### [MODIFY] [user.js](file:///d:/TripSmart/backend/src/routes/user.js)
- Filter GET /api/user/trips to only return trips where `booking.status === 'saved'` (not `'draft'` or undefined)

---

### Frontend

#### [NEW] [DashboardPage.tsx](file:///d:/TripSmart/src/app/pages/DashboardPage.tsx)
Full premium dashboard:
- Hero section with greeting + stats (saved trips count, total budget used)
- ML Recommendations carousel (from `/api/trips/recommendations`)
- Budget allocation widget (calls ML service for post-payment suggestions)
- Price trend section with sparkline-style bars
- Quick action buttons

#### [MODIFY] [App.tsx](file:///d:/TripSmart/src/app/App.tsx)
- Add `/dashboard` route → `DashboardPage`
- Route is protected (requires auth)

#### [MODIFY] [Navigation.tsx](file:///d:/TripSmart/src/app/components/Navigation.tsx)
- Add Dashboard link to nav

#### [MODIFY] [SavedTripDetailPage.tsx](file:///d:/TripSmart/src/app/pages/SavedTripDetailPage.tsx)
- Complete redesign to match TripDetailsPage emerald design
- 2-column layout (itinerary left, details sidebar right)
- Timeline-based day view with animation
- Emerald glass cards throughout

#### [MODIFY] [MyTripsPage.tsx](file:///d:/TripSmart/src/app/pages/MyTripsPage.tsx)
- Redesign with emerald theme
- Ensure "Saved Drafts" tab only shows truly saved trips (status === 'saved')
- Add loading skeletons

---

## Verification Plan

### ML Service
- Run `uvicorn app:app --reload --port 8001` — should start without ImportError
- `curl -X POST http://localhost:8001/alternatives -H "Content-Type: application/json" -d '{"current_plan": {"tier": "Budget"}}'`
- `curl -X POST http://localhost:8001/budget-allocation -d '{"remaining_budget": 5000}'`
- `curl -X POST http://localhost:8001/price-forecast -d '{"current_price": 5000, "departure_date": "2026-10-15", "transport_mode": "flight"}'`

### Frontend
- Navigate to `/dashboard` — check recommendations load
- Navigate to `/saved-trips` → Saved Drafts tab → only explicitly saved trips appear
- Click View Details on a saved trip → new emerald design renders correctly
