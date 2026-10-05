import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plane, Train, Hotel, MapPin, Clock, Users, IndianRupee,
  Download, ArrowLeft, Coffee, Utensils, Camera, Activity,
  Trash2, Calendar, Bookmark
} from 'lucide-react';
import { toast } from 'sonner';
import { formatINR } from '../../services/api';
import { printItinerary } from '../../utils/itineraryExport';

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

// ── Interfaces ───────────────────────────────────────────────────────────
interface SavedTripDetail {
  _id: string;
  source: { code: string; name: string; state?: string };
  destination: { code: string; name: string; state?: string };
  startDate: string;
  endDate: string;
  nights: number;
  travelers: number;
  tripType: string;
  budget: { amount: number; flexibility: string };
  plans: Array<{
    tier: string;
    displayName?: string;
    badge?: string;
    rating?: number;
    duration?: string;
    transport: any;
    hotel: any;
    costs: {
      transport: number;
      accommodation: number;
      activities: number;
      meals: number;
      miscellaneous: number;
      total: number;
    };
    highlights: string[];
    activities?: any;
  }>;
  itinerary: Array<{
    day: number;
    title: string;
    activities: Array<{
      time?: string;
      type?: string;
      activity?: string;
      name?: string;
      title?: string;
      description?: string;
      duration?: string;
      cost?: number;
      costLabel?: string;
    }>;
  }>;
  booking: { status: string; totalAmount?: number };
  createdAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────
function getActivityIcon(type: string, isTrainTransport: boolean) {
  const TransIcon = isTrainTransport ? Train : Plane;
  switch (type?.toLowerCase()) {
    case 'travel':
    case 'transport': return TransIcon;
    case 'accommodation': return Hotel;
    case 'meal': return Utensils;
    case 'leisure': return Coffee;
    case 'attraction':
    case 'activity': return Camera;
    default: return Activity;
  }
}

function typePillStyle(type: string) {
  switch (type?.toLowerCase()) {
    case 'transport':     return { bg: 'rgba(80,200,120,0.18)', color: '#50C878' };
    case 'accommodation': return { bg: 'rgba(11,110,79,0.30)',  color: '#D1F2EB' };
    case 'meal':          return { bg: 'rgba(209,242,235,0.10)',color: '#D1F2EB' };
    case 'attraction':
    case 'activity':      return { bg: 'rgba(80,200,120,0.12)', color: '#50C878' };
    case 'leisure':       return { bg: 'rgba(11,110,79,0.15)',  color: 'rgba(209,242,235,0.8)' };
    default:              return { bg: 'rgba(209,242,235,0.08)',color: 'rgba(209,242,235,0.7)' };
  }
}

// ── Components ───────────────────────────────────────────────────────────
function ActivityCard({ activity, index, isTrainTransport }: { activity: any; index: number; isTrainTransport: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const Icon = getActivityIcon(activity.type, isTrainTransport);
  const pill = typePillStyle(activity.type);
  const cost = activity.cost || activity.price || 0;
  const hasCost = cost > 0;
  const title = activity.activity || activity.name || activity.title || 'Activity';

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        <div className="w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{ background: C.card, border: `1.5px solid ${C.cardBorder}` }}>
          <Icon className="h-4 w-4" style={{ color: C.emerald }} />
        </div>
        <div className="flex-1 w-px mt-1" style={{ background: C.cardBorder, minHeight: 16 }} />
      </div>

      <div className="flex-1 rounded-2xl p-4 mb-3" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              {activity.time && (
                <span className="flex items-center gap-1" style={{ fontSize: '0.68rem', fontWeight: 600, color: C.textDim }}>
                  <Clock className="h-3 w-3" /> {activity.time}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{ fontSize: '0.62rem', background: pill.bg, color: pill.color }}>
                {activity.type || 'Activity'}
              </span>
            </div>
            <p className="font-semibold text-sm leading-snug mb-0.5" style={{ color: C.textMain }}>{title}</p>
            {activity.description && (
              <p className="text-xs leading-relaxed" style={{ color: C.textSub }}>{activity.description}</p>
            )}
            {activity.duration && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: C.textDim }}>
                <Clock className="h-2.5 w-2.5" /> {activity.duration}
              </p>
            )}
          </div>
          {hasCost && (
            <div className="shrink-0 rounded-xl px-2.5 py-1.5 text-right" style={{ background: 'rgba(80,200,120,0.12)', minWidth: 64 }}>
              <div className="font-bold text-xs" style={{ color: C.emerald }}>{formatINR(cost)}</div>
              {activity.costLabel && <div style={{ fontSize: '0.6rem', color: 'rgba(209,242,235,0.45)', marginTop: 1 }}>{activity.costLabel}</div>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SavedTripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<SavedTripDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`/api/user/trips/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTrip(data.data);
        } else {
          toast.error('Trip not found');
          navigate('/saved-trips');
        }
      } catch {
        toast.error('Failed to load trip');
        navigate('/saved-trips');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this trip? This cannot be undone.')) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/user/trips/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success('Trip deleted');
        navigate('/saved-trips');
      } else {
        toast.error('Failed to delete trip');
      }
    } catch {
      toast.error('Failed to delete trip');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    if (trip) {
      toast.success('Exporting itinerary PDF...');
      const fullTripData = { ...trip, id: trip._id };
      printItinerary(fullTripData as any, 0); // Using plan index 0
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!trip) return null;

  const plan = trip.plans?.[0]; // Assume first plan was selected/saved
  const isTrain = plan?.transport?.type === 'train' || plan?.transport?.mode === 'train';
  const totalCost = plan?.costs?.total || trip.booking?.totalAmount || 0;
  const days = trip.itinerary || [];
  const currentDay = days.find(d => d.day === activeDay) || days[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen font-sans"
      style={{ background: C.bg, color: C.textMain }}
    >
      <Navigation />

      {/* ── Background decoration ─────────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(11,110,79,0.4) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(80,200,120,0.15) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
      </div>

      <div className="relative pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4"
              style={{ color: C.emerald, fontSize: '0.8rem', fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to My Trips
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
                {trip.tripType || 'Leisure'} Trip
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                style={{ background: 'rgba(209,242,235,0.1)', color: C.mint }}>
                {trip.booking?.status === 'saved' ? 'Saved Draft' : 'Booked'}
              </span>
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: C.mint, lineHeight: 1.1 }}>
              {trip.source.name} to {trip.destination.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
              style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald, border: `1px solid ${C.cardBorder}` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(80,200,120,0.25)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(80,200,120,0.15)'}
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.25)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.15)'}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── 2-Column Layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Itinerary (2/3) */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 z-20 mb-8 rounded-2xl p-1.5 backdrop-blur-md"
              style={{ background: 'rgba(1,50,32,0.85)', border: `1px solid ${C.cardBorder}` }}>
              <div className="flex gap-1 overflow-x-auto pb-1 hide-scrollbar">
                {days.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => setActiveDay(d.day)}
                    className="flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
                    style={{
                      background: activeDay === d.day ? C.emerald : 'transparent',
                      color: activeDay === d.day ? C.bg : C.textDim,
                    }}
                  >
                    Day {d.day}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: C.mint, marginBottom: '2rem' }}>
                    {currentDay?.title || `Day ${activeDay}`}
                  </h3>
                  <div>
                    {currentDay?.activities?.length ? (
                      currentDay.activities.map((act, i) => (
                        <ActivityCard key={i} activity={act} index={i} isTrainTransport={isTrain} />
                      ))
                    ) : (
                      <p style={{ color: C.textSub }}>No activities planned for this day.</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Col: Details (1/3) */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="rounded-3xl p-6" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint, marginBottom: '1.5rem' }}>
                Trip Overview
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dates</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: C.mint }}>
                      {new Date(trip.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – {new Date(trip.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: C.mint }}>
                      {trip.nights} nights
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Travellers</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: C.mint }}>
                      {trip.travelers} Person{trip.travelers > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(80,200,120,0.15)', color: C.emerald }}>
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Cost</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: C.emerald }}>
                      {formatINR(totalCost)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            {plan?.transport && (
              <div className="rounded-3xl p-6" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isTrain ? <Train className="w-5 h-5" /> : <Plane className="w-5 h-5" />} Transport
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p style={{ fontSize: '0.85rem', color: C.textSub }}>Operator</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C.mint }}>
                      {plan.transport.operator || plan.transport.name || 'Standard'}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p style={{ fontSize: '0.85rem', color: C.textSub }}>Class</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C.mint, textTransform: 'capitalize' }}>
                      {plan.transport.class || 'Economy'}
                    </p>
                  </div>
                  {plan.transport.duration && (
                    <div className="flex justify-between items-center">
                      <p style={{ fontSize: '0.85rem', color: C.textSub }}>Duration</p>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C.mint }}>
                        {plan.transport.duration}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hotel Info */}
            {plan?.hotel && (
              <div className="rounded-3xl p-6" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.mint, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Hotel className="w-5 h-5" /> Accommodation
                </h3>
                <div className="space-y-4">
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: C.mint }}>{plan.hotel.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(plan.hotel.stars || 3)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#f59e0b' }} />
                      ))}
                    </div>
                  </div>
                  {plan.hotel.roomType && (
                    <div className="flex justify-between items-center pt-2">
                      <p style={{ fontSize: '0.85rem', color: C.textSub }}>Room</p>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C.mint }}>{plan.hotel.roomType}</p>
                    </div>
                  )}
                  {plan.hotel.location && (
                    <div className="flex items-start gap-2 pt-2">
                      <MapPin className="w-4 h-4 mt-0.5" style={{ color: C.textDim }} />
                      <p style={{ fontSize: '0.8rem', color: C.textSub, lineHeight: 1.4 }}>{plan.hotel.location}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}
