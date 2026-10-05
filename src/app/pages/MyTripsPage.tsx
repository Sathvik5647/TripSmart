import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Calendar, Users, IndianRupee, Trash2, Eye, Map, Plane
} from 'lucide-react';
import { toast } from 'sonner';
import { formatINR } from '../../services/api';

// ── Design Tokens ────────────────────────────────────────────────────────
const C = {
  bg:         '#013220',
  teal:       '#0B6E4F',
  emerald:    '#50C878',
  mint:       '#D1F2EB',
  card:       'rgba(11,110,79,0.18)',
  cardBorder: 'rgba(80,200,120,0.14)',
  textMain:   '#D1F2EB',
  textSub:    'rgba(209,242,235,0.55)',
  textDim:    'rgba(209,242,235,0.35)',
};

interface SavedTrip {
  _id: string;
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: string;
  selectedPlan: {
    tier: string;
    totalCost: number;
  };
  status: string;
  createdAt: string;
  bookingRef?: string;
}

// ── Dummy Booked/Past Data ───────────────────────────────────────────────
const FAKE_BOOKED_TRIPS: SavedTrip[] = [
  {
    _id: 'fake-booked-1',
    source: 'Mumbai',
    destination: 'Goa',
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    travelers: 2,
    tripType: 'tour',
    selectedPlan: { tier: 'Premium', totalCost: 45000 },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    bookingRef: 'TS-2026-GOA892'
  }
];

const FAKE_PAST_TRIPS: SavedTrip[] = [
  {
    _id: 'fake-past-1',
    source: 'Delhi',
    destination: 'Jaipur',
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    travelers: 3,
    tripType: 'tour',
    selectedPlan: { tier: 'Comfort', totalCost: 32000 },
    status: 'completed',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    bookingRef: 'TS-2025-JAI123'
  }
];

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'saved' | 'booked' | 'past'>('saved');

  useEffect(() => {
    if (user) fetchTrips();
    else setIsLoading(false);
  }, [user]);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/user/trips', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTrips(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/user/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTrips(prev => prev.filter(t => t._id !== tripId));
        toast.success('Trip deleted successfully');
      } else {
        toast.error('Failed to delete trip');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const savedTrips = trips.filter(t => t.status === 'saved');
  const bookedTrips = [...FAKE_BOOKED_TRIPS, ...trips.filter(t => t.status === 'confirmed')];
  const pastTrips = [...FAKE_PAST_TRIPS, ...trips.filter(t => t.status === 'completed' || t.status === 'cancelled')];

  const getActiveTrips = () => {
    if (activeTab === 'saved') return savedTrips;
    if (activeTab === 'booked') return bookedTrips;
    return pastTrips;
  };

  const renderTripCard = (trip: SavedTrip, index: number, isBookedOrPast = false) => (
    <motion.div
      key={trip._id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-3xl p-5"
      style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold tracking-wider uppercase"
              style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
              {trip.tripType || 'Leisure'}
            </span>
            {trip.selectedPlan?.tier && (
              <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold tracking-wider uppercase"
                style={{ background: 'rgba(209,242,235,0.1)', color: C.mint }}>
                {trip.selectedPlan.tier}
              </span>
            )}
            {trip.status === 'confirmed' && (
              <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold tracking-wider uppercase"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                Confirmed
              </span>
            )}
          </div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: C.mint }}>
            {trip.source} → {trip.destination}
          </h3>
          {trip.bookingRef && (
            <p style={{ fontSize: '0.7rem', color: C.textSub, marginTop: 4 }}>Ref: {trip.bookingRef}</p>
          )}
        </div>
        
        <div className="text-left sm:text-right">
          <p style={{ fontSize: '0.7rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Est. Cost</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: C.emerald }}>
            {formatINR(trip.selectedPlan?.totalCost || 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[0.7rem] uppercase tracking-wider text-emerald-400 opacity-60">
            <Calendar className="w-3.5 h-3.5" /> Start
          </div>
          <p className="text-sm font-medium" style={{ color: C.mint }}>{formatDate(trip.startDate)}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 text-[0.7rem] uppercase tracking-wider text-emerald-400 opacity-60">
            <Calendar className="w-3.5 h-3.5" /> End
          </div>
          <p className="text-sm font-medium" style={{ color: C.mint }}>{formatDate(trip.endDate)}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 text-[0.7rem] uppercase tracking-wider text-emerald-400 opacity-60">
            <Users className="w-3.5 h-3.5" /> Travellers
          </div>
          <p className="text-sm font-medium" style={{ color: C.mint }}>{trip.travelers} Person{trip.travelers > 1 ? 's' : ''}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 text-[0.7rem] uppercase tracking-wider text-emerald-400 opacity-60">
            <MapPin className="w-3.5 h-3.5" /> Destination
          </div>
          <p className="text-sm font-medium" style={{ color: C.mint }}>{trip.destination}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4" style={{ borderTop: `1px solid ${C.cardBorder}` }}>
        {!isBookedOrPast && (
          <button
            onClick={() => handleDeleteTrip(trip._id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.15)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)'}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        )}
        <button
          onClick={() => navigate(isBookedOrPast ? `/tickets/${trip._id}` : `/saved-trips/${trip._id}`)}
          className="flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all"
          style={{ background: C.emerald, color: C.bg }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#3db86a'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.emerald}
        >
          {isBookedOrPast ? <Plane className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {isBookedOrPast ? 'View Booking' : 'View Details'}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.textMain, fontFamily: '"Outfit", sans-serif' }}>
      <Navigation />
      
      <div className="relative pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
        <h1 className="mb-8" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: C.mint, lineHeight: 1.1 }}>
          My Trips
        </h1>

        <div className="flex gap-2 mb-8" style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
          {[
            { id: 'saved', label: 'Saved Drafts', count: savedTrips.length },
            { id: 'booked', label: 'Upcoming', count: bookedTrips.length },
            { id: 'past', label: 'Past Trips', count: pastTrips.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all"
              style={{
                color: activeTab === tab.id ? C.emerald : C.textDim,
                borderBottom: activeTab === tab.id ? `2px solid ${C.emerald}` : '2px solid transparent',
                background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                cursor: 'pointer', fontFamily: '"Playfair Display", serif'
              }}
            >
              {tab.label}
              <span className="px-2 py-0.5 rounded-full text-[0.65rem] bg-opacity-20"
                style={{ background: activeTab === tab.id ? 'rgba(80,200,120,0.15)' : 'rgba(209,242,235,0.1)', color: activeTab === tab.id ? C.emerald : C.textDim }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {getActiveTrips().length > 0 ? (
                getActiveTrips().map((trip, i) => renderTripCard(trip, i, activeTab !== 'saved'))
              ) : (
                <div className="text-center py-20 rounded-3xl" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                  <Map className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: C.emerald }} />
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: C.mint, mb: 2 }}>
                    No trips found
                  </h3>
                  <p style={{ color: C.textSub, fontSize: '0.9rem', maxWidth: 300, margin: '0 auto 1.5rem' }}>
                    {activeTab === 'saved' ? "You haven't saved any drafts yet." : 
                     activeTab === 'booked' ? "You have no upcoming trips." : 
                     "You have no past trips."}
                  </p>
                  <button
                    onClick={() => navigate('/plan-trip')}
                    className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                    style={{ background: C.emerald, color: C.bg, border: 'none', cursor: 'pointer' }}
                  >
                    Plan a new trip
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
