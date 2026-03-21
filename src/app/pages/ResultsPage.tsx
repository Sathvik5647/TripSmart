import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plane, Train, Hotel, Clock, Star, ArrowRight, Calendar, MapPin, ArrowUpDown, IndianRupee, Users, Activity, Info, Bookmark, Scale, Eye, Headphones, ShieldAlert } from 'lucide-react';
import MapBackground from '../components/MapBackground';
import { toast } from 'sonner';
import { formatINR, type TripPlanData } from '../../services/api';
import { arcPath, getCoordinates, getCoordinatesByIATA } from '../../data/cityCoordinates';

function isIataLike(value?: string) {
  return !!value && /^[A-Z]{3}$/.test(value.trim());
}

function resolveCoordinates(value?: string, fallbackCity?: string): [number, number] | null {
  if (isIataLike(value)) {
    const byCode = getCoordinatesByIATA(value as string);
    if (byCode) return byCode;
  }
  if (value) {
    const byCity = getCoordinates(value);
    if (byCity) return byCity;
  }
  if (fallbackCity) {
    return getCoordinates(fallbackCity);
  }
  return null;
}

function getPlanRoutePreview(plan: TripPlanData, formData: any) {
  const outbound: any = plan.flight?.outbound || {};
  const trainRoutePath = outbound.routePath as [number, number][] | undefined;
  const isTrain =
    plan.transport?.mode === 'train' ||
    plan.transport?.type === 'train' ||
    outbound?.mode === 'train' ||
    outbound?.type === 'train';

  const from = resolveCoordinates(outbound.departure, formData?.origin);
  const to = resolveCoordinates(outbound.arrival, formData?.destination);

  const flightPaths: [number, number][][] = [];
  const trainPaths: [number, number][][] = [];

  if (isTrain) {
    if (Array.isArray(trainRoutePath) && trainRoutePath.length > 1) {
      trainPaths.push(trainRoutePath);
    } else if (from && to) {
      trainPaths.push([from, to]);
    }
  } else if (from && to) {
    flightPaths.push(arcPath(from, to));
  }

  return { isTrain, flightPaths, trainPaths };
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState('recommended');
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [focusedPlanId, setFocusedPlanId] = useState<number | null>(null);
  const [shortlistedPlanIds, setShortlistedPlanIds] = useState<number[]>([]);
  const [comparePlanIds, setComparePlanIds] = useState<number[]>([]);

  // Get trip plans from navigation state or use defaults
  const {
    formData,
    tripPlans: generatedPlans,
    includeActivities = true,
    arrivalInfo,
    isReturnTrip = true,
    adjustedNights,
  } = location.state || {};

  const tripPlans: TripPlanData[] = generatedPlans || [];

  // Sort plans based on selection
  const sortedPlans = [...tripPlans].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleGenerateItinerary = (planId: number) => {
    const selectedTripPlan = tripPlans.find(p => p.id === planId);
    if (!selectedTripPlan) return;
    toast.success('Opening itinerary workspace...');
    setTimeout(() => {
      navigate(`/trip-details/${planId}`, { state: { tripPlan: selectedTripPlan, formData } });
    }, 350);
  };

  const toggleExpand = (id: number) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  const toggleShortlist = (planId: number) => {
    setShortlistedPlanIds((current) => {
      if (current.includes(planId)) {
        toast.info('Removed from saved plans');
        return current.filter((id) => id !== planId);
      }
      toast.success('Plan saved for later');
      return [...current, planId];
    });
  };

  const toggleCompare = (planId: number) => {
    setComparePlanIds((current) => {
      if (current.includes(planId)) {
        return current.filter((id) => id !== planId);
      }
      if (current.length >= 2) {
        toast.info('You can compare up to 2 plans at once');
        return current;
      }
      return [...current, planId];
    });
  };

  const focusedPlan = useMemo(() => {
    const fallback = sortedPlans[0]?.id ?? null;
    const selectedId = focusedPlanId ?? fallback;
    return sortedPlans.find((plan) => plan.id === selectedId) ?? sortedPlans[0] ?? null;
  }, [focusedPlanId, sortedPlans]);

  const comparePlans = sortedPlans.filter((p) => comparePlanIds.includes(p.id));
  const focusedRoute = focusedPlan ? getPlanRoutePreview(focusedPlan, formData) : null;

  // If no plans available, show message
  if (!tripPlans || tripPlans.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 pb-20">
        <Navigation />
        <main className="container mx-auto mt-8 px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-2xl font-bold mb-4">No Trip Plans Found</h1>
            <p className="text-muted-foreground mb-6">Generate a new itinerary to see recommendations.</p>
            <Button onClick={() => navigate('/plan-trip')}>
              Build Itinerary <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <Navigation />

      <main className="container mx-auto mt-8 px-4">
        {/* Header & Filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Trip Options Are Ready</h1>
            <p className="text-muted-foreground">
              Compare, save, and deep-dive into routes for {formData?.origin || 'Origin'} → {formData?.destination || 'Destination'}
              {formData?.travelers && ` • ${formData.travelers} traveler${formData.travelers > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trip Summary */}
        {tripPlans.length > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-lg">
                      {formData?.origin} → {formData?.destination}
                    </span>
                    <Badge variant="outline" className="ml-2">
                      {isReturnTrip ? 'Round Trip' : 'One-way'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {formData?.travelers || 1} traveler{(formData?.travelers || 1) > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {((adjustedNights ?? formData?.nights ?? 1) + 1)} day{((adjustedNights ?? formData?.nights ?? 1) + 1) !== 1 ? 's' : ''}
                    </span>
                    {arrivalInfo?.isNextDayArrival && (
                      <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                        <Clock className="h-4 w-4" />
                        Overnight travel
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      {formData?.tripType === 'tour' ? 'Tour' : 'Direct'}
                    </span>
                  </div>
                </div>
                <div className="text-right border-l pl-4 md:border-l-0 md:pl-0">
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-2xl font-bold text-primary flex items-center justify-end gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {formatINR(Math.min(...tripPlans.map(p => p.price))).replace('₹', '')}
                  </p>
                  {Math.min(...tripPlans.map(p => p.price)) !== Math.max(...tripPlans.map(p => p.price)) && (
                    <p className="text-xs text-muted-foreground">
                      to {formatINR(Math.max(...tripPlans.map(p => p.price)))}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {focusedPlan && focusedRoute && (
          <Card className="mb-6 overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-lg">Interactive Route Map</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Showing route for {focusedPlan.name}. This view becomes more useful when you add multiple stops.
                  </p>
                </div>
                <Badge variant="outline">Focused plan: {focusedPlan.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-72 rounded-xl overflow-hidden border bg-muted/20">
                <MapBackground
                  origin={formData?.origin}
                  destination={formData?.destination}
                  stops={formData?.stops || []}
                  showDirectDistance
                  flightPaths={focusedRoute.flightPaths}
                  trainPaths={focusedRoute.trainPaths}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Map legend</span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-0.5 w-6 rounded bg-sky-400" /> Flight path
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-0.5 w-6 rounded bg-orange-400" style={{ borderTop: '2px dashed' }} /> Train path
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-0.5 w-6 rounded bg-blue-500" style={{ borderTop: '2px dashed' }} /> Through stops
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notice when activities are not included */}
        {!includeActivities && (
          <div className="mb-6 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex items-center gap-3">
            <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0" />
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-200">Activities not included</p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                You chose not to include sightseeing activities. Budget focuses on transport, accommodation, and meals only.
              </p>
            </div>
          </div>
        )}

        {comparePlans.length === 2 && (
          <Card className="mb-6 border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg">Quick Compare</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {comparePlans.map((plan) => (
                <div key={plan.id} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{plan.name}</p>
                    <Badge variant="secondary">{plan.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatINR(plan.price)} total • {plan.rating.toFixed(1)} rating</p>
                  <p className="text-xs text-muted-foreground">
                    Transport: {formatINR(plan.breakdown.transport)} • Stay: {formatINR(plan.breakdown.accommodation)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Trip Plans */}
        <div className="space-y-6">
          {sortedPlans.map((plan) => {
            const isExpanded = expandedPlan === plan.id;
            const isShortlisted = shortlistedPlanIds.includes(plan.id);
            const isCompared = comparePlanIds.includes(plan.id);
            const badgeColors: Record<number, string> = {
              1: "bg-green-500",
              2: "bg-primary",
              3: "bg-purple-500",
            };
            const borderColors: Record<number, string> = {
              1: "border-green-500/30",
              2: "border-primary/30",
              3: "border-purple-500/30",
            };

            return (
              <Card key={plan.id} className={`border-2 bg-background shadow-sm ${borderColors[plan.id] || 'border-primary/30'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <Badge className={`${badgeColors[plan.id] || 'bg-primary'} text-white`}>{plan.badge}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{plan.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{formData?.travelers || 1} person(s)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {formatINR(plan.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total for all</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {plan.flight?.outbound && (() => {
                        // Determine if this is a train or flight
                        const isTrain = plan.transport?.mode === 'train' ||
                          plan.flight?.outbound?.mode === 'train' ||
                          plan.flight?.outbound?.type === 'train';
                        const TransportIcon = isTrain ? Train : Plane;
                        const transportName = plan.flight.outbound.name || plan.flight.outbound.airline || (isTrain ? 'Train' : 'Flight');

                        // Format duration properly
                        let durationStr = '';
                        const dur = plan.flight.outbound.duration;
                        if (typeof dur === 'object' && dur?.hours !== undefined) {
                          durationStr = dur.minutes > 0 ? `${dur.hours}h ${dur.minutes}m` : `${dur.hours}h`;
                        } else if (typeof dur === 'string') {
                          durationStr = dur;
                        }

                        return (
                          <div className="flex items-center gap-1">
                            <TransportIcon className="h-4 w-4" />
                            <span>
                              {transportName}
                              {durationStr && ` • ${durationStr}`}
                              {plan.flight.outbound.stops !== undefined && (
                                <> • {plan.flight.outbound.stops === 0 ? 'Direct' : `${plan.flight.outbound.stops} stop`}</>
                              )}
                            </span>
                          </div>
                        );
                      })()}
                      {plan.hotel?.name && (
                        <div className="flex items-center gap-1">
                          <Hotel className="h-4 w-4" />
                          <span>{plan.hotel.stars || 3}★ {(plan.hotel.name || 'Hotel').split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        <span>{plan.activities?.list?.length || 0} activities</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {(plan.highlights || []).slice(0, 4).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="space-y-6 pt-4 border-t animate-in slide-in-from-top-2">
                        {/* Cost Breakdown */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <IndianRupee className="h-4 w-4" /> Cost Breakdown
                          </h4>
                          <div className={`grid gap-2 ${includeActivities ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
                            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Transport</div>
                              <div className="font-semibold">{formatINR(plan.breakdown?.transport || 0)}</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Stay</div>
                              <div className="font-semibold">{formatINR(plan.breakdown?.accommodation || 0)}</div>
                            </div>
                            {/* Only show Activities when included */}
                            {includeActivities && (
                              <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg">
                                <div className="text-xs text-muted-foreground">Activities</div>
                                <div className="font-semibold">{formatINR(plan.breakdown?.activities || 0)}</div>
                              </div>
                            )}
                            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Meals</div>
                              <div className="font-semibold">{formatINR(plan.breakdown?.meals || 0)}</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Misc</div>
                              <div className="font-semibold">{formatINR(plan.breakdown?.misc || 0)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Flight & Hotel Details */}
                        <div className="grid gap-4 md:grid-cols-2">
                          {/* Flight Details - only show if flight data exists */}
                          {plan.flight?.outbound && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Plane className="h-4 w-4 text-primary" />
                                <span className="font-medium">Transport</span>
                                <span className="text-sm text-muted-foreground ml-auto">{formatINR(plan.flight?.totalPrice || 0)}</span>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Outbound</span>
                                  <span>{plan.flight.outbound.departure || 'N/A'} → {plan.flight.outbound.arrival || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Duration</span>
                                  <span>
                                    {typeof plan.flight.outbound.duration === 'object'
                                      ? `${plan.flight.outbound.duration.hours || 0}h ${plan.flight.outbound.duration.minutes || 0}m`
                                      : (plan.flight.outbound.duration || 'N/A')
                                    } • {plan.flight.outbound.stops === 0 ? 'Direct' : `${plan.flight.outbound.stops || 0} stop`}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Mode</span>
                                  <span>{plan.flight.outbound.airline || 'Transport'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Class</span>
                                  <span className="capitalize">{plan.flight.outbound.class || 'Standard'}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* Hotel Details - only show if hotel data exists */}
                          {plan.hotel?.name && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Hotel className="h-4 w-4 text-primary" />
                                <span className="font-medium">Accommodation</span>
                                <span className="text-sm text-muted-foreground ml-auto">{formatINR(plan.hotel?.totalPrice || 0)}</span>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Hotel</span>
                                  <span>{plan.hotel.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Rating</span>
                                  <span className="flex items-center gap-1">
                                    {Array.from({ length: plan.hotel.stars || 3 }).map((_, i) => (
                                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Location</span>
                                  <span>{plan.hotel.location || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Duration</span>
                                  <span>{plan.hotel.nights || 1} nights</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Sample Activities */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="h-4 w-4 text-primary" />
                            <span className="font-medium">Hotel And Activity Details</span>
                            <span className="text-sm text-muted-foreground ml-auto">{formatINR(plan.activities?.totalPrice ?? 0)}</span>
                          </div>
                          <div className="grid gap-2 md:grid-cols-3">
                            {(plan.activities?.list ?? []).slice(0, 6).map((activity, idx) => (
                              <div key={idx} className="bg-muted/50 p-2 rounded text-sm">
                                <div className="font-medium truncate">{activity.name}</div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{activity.duration}</span>
                                  <span>{formatINR(activity.price)}</span>
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {activity.rating?.toFixed?.(1) || '4.2'} • {activity.reviews || 120} reviews
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="rounded-lg border bg-muted/40 p-3">
                            <p className="font-medium mb-1 flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Booking Confirmation Section</p>
                            <p className="text-sm text-muted-foreground">Once you confirm this plan, your itinerary, payment receipt, and booking ID will be generated instantly.</p>
                          </div>
                          <div className="rounded-lg border bg-muted/40 p-3">
                            <p className="font-medium mb-1 flex items-center gap-2"><Headphones className="h-4 w-4 text-primary" /> Emergency Contact And Support</p>
                            <p className="text-sm text-muted-foreground">24x7 support: +91 1800-11-TRIP • Emergency: +91 112 • In-app live assistance available.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                <div className="px-6 pb-6 grid gap-2 md:grid-cols-4">
                  <Button variant={isShortlisted ? 'default' : 'outline'} size="sm" onClick={() => toggleShortlist(plan.id)}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    {isShortlisted ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant={isCompared ? 'default' : 'outline'} size="sm" onClick={() => toggleCompare(plan.id)}>
                    <Scale className="mr-2 h-4 w-4" />
                    {isCompared ? 'Comparing' : 'Compare'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { toggleExpand(plan.id); setFocusedPlanId(plan.id); }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button onClick={() => handleGenerateItinerary(plan.id)} className="bg-gradient-to-r from-primary to-cyan-600 hover:brightness-110" size="sm">
                    Generate Itinerary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Booking Confirmation Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>You will receive instant confirmation with booking ID, payment receipt, and downloadable itinerary after finalizing any plan.</p>
              <p>Cancellation: free up to 24 hours before departure in most cases.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                Emergency Contact And Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">TripSmart Support: +91 1800-11-TRIP</p>
              <p className="text-muted-foreground">Medical Emergency: +91 108</p>
              <p className="text-muted-foreground">National Helpline: +91 112</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Summary Card */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Your Budget</h3>
                <p className="text-sm text-muted-foreground">
                  Budget target set to {formatINR(formData?.budget || 25000)} per person
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/plan-trip', { state: { formData } })}>
                Edit Trip Inputs
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
