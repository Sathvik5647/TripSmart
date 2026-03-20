// Comprehensive Indian Cities Database
// This data is based on real Indian cities with accurate information

const cities = [
  // Metro Cities
  {
    id: 'DEL',
    code: 'DEL',
    name: 'Delhi',
    fullName: 'New Delhi',
    state: 'Delhi',
    type: 'metro',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    timezone: 'Asia/Kolkata',
    description: 'Capital city of India with rich Mughal heritage, modern infrastructure, and vibrant culture',
    popularFor: ['Historical Monuments', 'Street Food', 'Shopping', 'Culture', 'Nightlife'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '5-20°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1500, midRange: 3500, luxury: 8000 },
    transport: {
      hasAirport: true,
      airportCode: 'DEL',
      airportName: 'Indira Gandhi International Airport',
      hasRailway: true,
      railwayStations: ['New Delhi', 'Old Delhi', 'Hazrat Nizamuddin', 'Anand Vihar'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Red Fort', type: 'Monument', entryFee: 35, duration: '2-3 hours' },
      { name: 'Qutub Minar', type: 'Monument', entryFee: 35, duration: '1-2 hours' },
      { name: 'India Gate', type: 'Monument', entryFee: 0, duration: '1 hour' },
      { name: 'Humayun\'s Tomb', type: 'Monument', entryFee: 35, duration: '1-2 hours' },
      { name: 'Lotus Temple', type: 'Religious', entryFee: 0, duration: '1 hour' },
      { name: 'Chandni Chowk', type: 'Market', entryFee: 0, duration: '3-4 hours' }
    ],
    imageUrl: '/images/cities/delhi.jpg'
  },
  {
    id: 'BOM',
    code: 'BOM',
    name: 'Mumbai',
    fullName: 'Mumbai (Bombay)',
    state: 'Maharashtra',
    type: 'metro',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    timezone: 'Asia/Kolkata',
    description: 'Financial capital of India, home to Bollywood, beaches, and colonial architecture',
    popularFor: ['Bollywood', 'Beaches', 'Nightlife', 'Street Food', 'Business', 'Gateway of India'],
    bestTimeToVisit: { months: ['Nov', 'Dec', 'Jan', 'Feb'], season: 'Winter' },
    weather: { summer: '25-35°C', winter: '15-30°C', monsoon: '24-30°C' },
    averageDailyBudget: { budget: 2000, midRange: 4500, luxury: 12000 },
    transport: {
      hasAirport: true,
      airportCode: 'BOM',
      airportName: 'Chhatrapati Shivaji Maharaj International Airport',
      hasRailway: true,
      railwayStations: ['Mumbai Central', 'Chhatrapati Shivaji Terminus', 'Lokmanya Tilak Terminus', 'Bandra Terminus'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Gateway of India', type: 'Monument', entryFee: 0, duration: '1 hour' },
      { name: 'Marine Drive', type: 'Scenic', entryFee: 0, duration: '2 hours' },
      { name: 'Elephanta Caves', type: 'Monument', entryFee: 40, duration: '4-5 hours' },
      { name: 'Siddhivinayak Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Juhu Beach', type: 'Beach', entryFee: 0, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/mumbai.jpg'
  },
  {
    id: 'BLR',
    code: 'BLR',
    name: 'Bangalore',
    fullName: 'Bengaluru',
    state: 'Karnataka',
    type: 'metro',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    timezone: 'Asia/Kolkata',
    description: 'IT hub of India with pleasant weather year-round, gardens, and vibrant nightlife',
    popularFor: ['IT Parks', 'Pubs & Breweries', 'Gardens', 'Pleasant Weather', 'Startups'],
    bestTimeToVisit: { months: ['Jan', 'Feb', 'Mar', 'Apr', 'Sep', 'Oct', 'Nov', 'Dec'], season: 'Year-round' },
    weather: { summer: '20-35°C', winter: '15-27°C', monsoon: '18-28°C' },
    averageDailyBudget: { budget: 1500, midRange: 3500, luxury: 8000 },
    transport: {
      hasAirport: true,
      airportCode: 'BLR',
      airportName: 'Kempegowda International Airport',
      hasRailway: true,
      railwayStations: ['Bangalore City', 'Yesvantpur', 'Krishnarajapuram'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Lalbagh Botanical Garden', type: 'Garden', entryFee: 25, duration: '2-3 hours' },
      { name: 'Cubbon Park', type: 'Garden', entryFee: 0, duration: '2 hours' },
      { name: 'Bangalore Palace', type: 'Palace', entryFee: 230, duration: '2 hours' },
      { name: 'ISKCON Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' }
    ],
    imageUrl: '/images/cities/bangalore.jpg'
  },
  {
    id: 'MAA',
    code: 'MAA',
    name: 'Chennai',
    fullName: 'Chennai (Madras)',
    state: 'Tamil Nadu',
    type: 'metro',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    timezone: 'Asia/Kolkata',
    description: 'Cultural capital of South India with temples, beaches, and rich Tamil heritage',
    popularFor: ['Temples', 'Beaches', 'Classical Music', 'South Indian Cuisine', 'Silk Sarees'],
    bestTimeToVisit: { months: ['Nov', 'Dec', 'Jan', 'Feb'], season: 'Winter' },
    weather: { summer: '28-42°C', winter: '20-30°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1200, midRange: 3000, luxury: 7000 },
    transport: {
      hasAirport: true,
      airportCode: 'MAA',
      airportName: 'Chennai International Airport',
      hasRailway: true,
      railwayStations: ['Chennai Central', 'Chennai Egmore', 'Tambaram'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Marina Beach', type: 'Beach', entryFee: 0, duration: '2-3 hours' },
      { name: 'Kapaleeshwarar Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Fort St. George', type: 'Monument', entryFee: 15, duration: '2 hours' },
      { name: 'Government Museum', type: 'Museum', entryFee: 15, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/chennai.jpg'
  },
  {
    id: 'CCU',
    code: 'CCU',
    name: 'Kolkata',
    fullName: 'Kolkata (Calcutta)',
    state: 'West Bengal',
    type: 'metro',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    timezone: 'Asia/Kolkata',
    description: 'City of Joy with colonial architecture, cultural heritage, and famous sweets',
    popularFor: ['Colonial Architecture', 'Sweets', 'Literature', 'Durga Puja', 'Trams', 'Art'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-40°C', winter: '12-25°C', monsoon: '26-35°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'CCU',
      airportName: 'Netaji Subhas Chandra Bose International Airport',
      hasRailway: true,
      railwayStations: ['Howrah', 'Sealdah', 'Kolkata'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Victoria Memorial', type: 'Monument', entryFee: 30, duration: '2-3 hours' },
      { name: 'Howrah Bridge', type: 'Landmark', entryFee: 0, duration: '1 hour' },
      { name: 'Indian Museum', type: 'Museum', entryFee: 20, duration: '2-3 hours' },
      { name: 'Dakshineswar Kali Temple', type: 'Religious', entryFee: 0, duration: '2 hours' }
    ],
    imageUrl: '/images/cities/kolkata.jpg'
  },
  {
    id: 'HYD',
    code: 'HYD',
    name: 'Hyderabad',
    fullName: 'Hyderabad',
    state: 'Telangana',
    type: 'metro',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    timezone: 'Asia/Kolkata',
    description: 'City of Pearls with Nizami heritage, famous biryani, and growing IT sector',
    popularFor: ['Biryani', 'Charminar', 'IT Industry', 'Pearls', 'Nizami Culture'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-42°C', winter: '14-30°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 1200, midRange: 3000, luxury: 7000 },
    transport: {
      hasAirport: true,
      airportCode: 'HYD',
      airportName: 'Rajiv Gandhi International Airport',
      hasRailway: true,
      railwayStations: ['Secunderabad', 'Hyderabad Deccan', 'Kacheguda'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Charminar', type: 'Monument', entryFee: 25, duration: '1-2 hours' },
      { name: 'Golconda Fort', type: 'Fort', entryFee: 25, duration: '3-4 hours' },
      { name: 'Hussain Sagar Lake', type: 'Scenic', entryFee: 0, duration: '2 hours' },
      { name: 'Ramoji Film City', type: 'Entertainment', entryFee: 1500, duration: 'Full day' }
    ],
    imageUrl: '/images/cities/hyderabad.jpg'
  },

  // Major Tourist Destinations
  {
    id: 'JAI',
    code: 'JAI',
    name: 'Jaipur',
    fullName: 'Jaipur (Pink City)',
    state: 'Rajasthan',
    type: 'tourist',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    timezone: 'Asia/Kolkata',
    description: 'Pink City of India with majestic forts, royal palaces, and rich Rajasthani culture',
    popularFor: ['Forts', 'Palaces', 'Handicrafts', 'Culture', 'Shopping', 'Rajasthani Cuisine'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '8-22°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1200, midRange: 2800, luxury: 8000 },
    transport: {
      hasAirport: true,
      airportCode: 'JAI',
      airportName: 'Jaipur International Airport',
      hasRailway: true,
      railwayStations: ['Jaipur Junction'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Amber Fort', type: 'Fort', entryFee: 100, duration: '3-4 hours' },
      { name: 'Hawa Mahal', type: 'Palace', entryFee: 50, duration: '1 hour' },
      { name: 'City Palace', type: 'Palace', entryFee: 200, duration: '2-3 hours' },
      { name: 'Jantar Mantar', type: 'Observatory', entryFee: 50, duration: '1 hour' },
      { name: 'Nahargarh Fort', type: 'Fort', entryFee: 50, duration: '2 hours' }
    ],
    imageUrl: '/images/cities/jaipur.jpg'
  },
  {
    id: 'AGR',
    code: 'AGR',
    name: 'Agra',
    fullName: 'Agra',
    state: 'Uttar Pradesh',
    type: 'tourist',
    coordinates: { lat: 27.1767, lng: 78.0081 },
    timezone: 'Asia/Kolkata',
    description: 'Home to the iconic Taj Mahal, a UNESCO World Heritage Site and symbol of eternal love',
    popularFor: ['Taj Mahal', 'Agra Fort', 'Mughal Architecture', 'Petha Sweets', 'Marble Inlay'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-47°C', winter: '4-22°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'AGR',
      airportName: 'Agra Airport',
      hasRailway: true,
      railwayStations: ['Agra Cantt', 'Agra Fort', 'Raja Ki Mandi'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Taj Mahal', type: 'Monument', entryFee: 50, duration: '2-3 hours' },
      { name: 'Agra Fort', type: 'Fort', entryFee: 50, duration: '2-3 hours' },
      { name: 'Fatehpur Sikri', type: 'Monument', entryFee: 50, duration: '3-4 hours' },
      { name: 'Mehtab Bagh', type: 'Garden', entryFee: 50, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/agra.jpg'
  },
  {
    id: 'GOI',
    code: 'GOI',
    name: 'Goa',
    fullName: 'Goa',
    state: 'Goa',
    type: 'tourist',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    timezone: 'Asia/Kolkata',
    description: 'Beach paradise with Portuguese heritage, vibrant nightlife, and water sports',
    popularFor: ['Beaches', 'Nightlife', 'Water Sports', 'Churches', 'Seafood', 'Casinos'],
    bestTimeToVisit: { months: ['Nov', 'Dec', 'Jan', 'Feb'], season: 'Winter' },
    weather: { summer: '25-35°C', winter: '20-32°C', monsoon: '24-30°C' },
    averageDailyBudget: { budget: 1500, midRange: 3500, luxury: 10000 },
    transport: {
      hasAirport: true,
      airportCode: 'GOI',
      airportName: 'Goa International Airport (Dabolim)',
      hasRailway: true,
      railwayStations: ['Madgaon', 'Vasco da Gama', 'Thivim'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Baga Beach', type: 'Beach', entryFee: 0, duration: '4-5 hours' },
      { name: 'Basilica of Bom Jesus', type: 'Religious', entryFee: 0, duration: '1 hour' },
      { name: 'Fort Aguada', type: 'Fort', entryFee: 0, duration: '1-2 hours' },
      { name: 'Dudhsagar Falls', type: 'Nature', entryFee: 400, duration: 'Full day' },
      { name: 'Anjuna Flea Market', type: 'Market', entryFee: 0, duration: '3-4 hours' }
    ],
    imageUrl: '/images/cities/goa.jpg'
  },
  {
    id: 'UDR',
    code: 'UDR',
    name: 'Udaipur',
    fullName: 'Udaipur (City of Lakes)',
    state: 'Rajasthan',
    type: 'tourist',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    timezone: 'Asia/Kolkata',
    description: 'Romantic city of lakes with stunning palaces, scenic beauty, and royal heritage',
    popularFor: ['Lakes', 'Palaces', 'Romance', 'Art', 'Sunset Views', 'Heritage Hotels'],
    bestTimeToVisit: { months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '24-42°C', winter: '8-28°C', monsoon: '24-32°C' },
    averageDailyBudget: { budget: 1200, midRange: 3000, luxury: 15000 },
    transport: {
      hasAirport: true,
      airportCode: 'UDR',
      airportName: 'Maharana Pratap Airport',
      hasRailway: true,
      railwayStations: ['Udaipur City'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'City Palace', type: 'Palace', entryFee: 300, duration: '3-4 hours' },
      { name: 'Lake Pichola', type: 'Lake', entryFee: 0, duration: '2-3 hours' },
      { name: 'Jag Mandir', type: 'Palace', entryFee: 500, duration: '2 hours' },
      { name: 'Saheliyon Ki Bari', type: 'Garden', entryFee: 10, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/udaipur.jpg'
  },
  {
    id: 'VNS',
    code: 'VNS',
    name: 'Varanasi',
    fullName: 'Varanasi (Kashi/Banaras)',
    state: 'Uttar Pradesh',
    type: 'tourist',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    timezone: 'Asia/Kolkata',
    description: 'Spiritual capital of India, one of the oldest continuously inhabited cities in the world',
    popularFor: ['Ghats', 'Spirituality', 'Temples', 'Silk', 'Ganga Aarti', 'Ancient Culture'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '5-20°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'VNS',
      airportName: 'Lal Bahadur Shastri Airport',
      hasRailway: true,
      railwayStations: ['Varanasi Junction', 'Varanasi City', 'Manduadih'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Dashashwamedh Ghat', type: 'Religious', entryFee: 0, duration: '2-3 hours' },
      { name: 'Kashi Vishwanath Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Sarnath', type: 'Religious', entryFee: 20, duration: '3-4 hours' },
      { name: 'Assi Ghat', type: 'Religious', entryFee: 0, duration: '1-2 hours' }
    ],
    imageUrl: '/images/cities/varanasi.jpg'
  },
  {
    id: 'COK',
    code: 'COK',
    name: 'Kochi',
    fullName: 'Kochi (Cochin)',
    state: 'Kerala',
    type: 'tourist',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    timezone: 'Asia/Kolkata',
    description: 'Gateway to Kerala with backwaters, Chinese fishing nets, and colonial history',
    popularFor: ['Backwaters', 'Chinese Fishing Nets', 'Spices', 'Kathakali', 'Fort Kochi'],
    bestTimeToVisit: { months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-35°C', winter: '22-32°C', monsoon: '23-30°C' },
    averageDailyBudget: { budget: 1200, midRange: 2800, luxury: 7000 },
    transport: {
      hasAirport: true,
      airportCode: 'COK',
      airportName: 'Cochin International Airport',
      hasRailway: true,
      railwayStations: ['Ernakulam Junction', 'Ernakulam Town'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Chinese Fishing Nets', type: 'Landmark', entryFee: 0, duration: '1 hour' },
      { name: 'Fort Kochi', type: 'Heritage', entryFee: 0, duration: '3-4 hours' },
      { name: 'Mattancherry Palace', type: 'Palace', entryFee: 5, duration: '1-2 hours' },
      { name: 'Jewish Synagogue', type: 'Religious', entryFee: 5, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/kochi.jpg'
  },
  {
    id: 'IXM',
    code: 'IXM',
    name: 'Munnar',
    fullName: 'Munnar',
    state: 'Kerala',
    type: 'tourist',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    timezone: 'Asia/Kolkata',
    description: 'Hill station with sprawling tea plantations, misty mountains, and cool climate',
    popularFor: ['Tea Gardens', 'Hills', 'Trekking', 'Wildlife', 'Scenic Beauty'],
    bestTimeToVisit: { months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], season: 'Year-round except monsoon' },
    weather: { summer: '15-25°C', winter: '5-20°C', monsoon: '15-22°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 6000 },
    transport: {
      hasAirport: false,
      nearestAirport: { code: 'COK', name: 'Cochin International Airport', distance: '130 km' },
      hasRailway: false,
      nearestRailway: { station: 'Aluva', distance: '110 km' },
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Tea Museum', type: 'Museum', entryFee: 125, duration: '1-2 hours' },
      { name: 'Eravikulam National Park', type: 'Wildlife', entryFee: 125, duration: '3-4 hours' },
      { name: 'Top Station', type: 'Viewpoint', entryFee: 0, duration: '2-3 hours' },
      { name: 'Mattupetty Dam', type: 'Scenic', entryFee: 0, duration: '1-2 hours' }
    ],
    imageUrl: '/images/cities/munnar.jpg'
  },
  {
    id: 'SXR',
    code: 'SXR',
    name: 'Srinagar',
    fullName: 'Srinagar',
    state: 'Jammu & Kashmir',
    type: 'tourist',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    timezone: 'Asia/Kolkata',
    description: 'Paradise on Earth with Dal Lake houseboats, Mughal gardens, and snow-capped mountains',
    popularFor: ['Dal Lake', 'Houseboats', 'Gardens', 'Shikara Rides', 'Handicrafts'],
    bestTimeToVisit: { months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], season: 'Summer' },
    weather: { summer: '12-30°C', winter: '-2-10°C', monsoon: '15-25°C' },
    averageDailyBudget: { budget: 1500, midRange: 3200, luxury: 8000 },
    transport: {
      hasAirport: true,
      airportCode: 'SXR',
      airportName: 'Sheikh ul-Alam International Airport',
      hasRailway: false,
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Dal Lake', type: 'Lake', entryFee: 0, duration: '4-5 hours' },
      { name: 'Shalimar Bagh', type: 'Garden', entryFee: 24, duration: '1-2 hours' },
      { name: 'Nishat Bagh', type: 'Garden', entryFee: 24, duration: '1-2 hours' },
      { name: 'Shankaracharya Temple', type: 'Religious', entryFee: 0, duration: '2 hours' }
    ],
    imageUrl: '/images/cities/srinagar.jpg'
  },
  {
    id: 'IXL',
    code: 'IXL',
    name: 'Leh',
    fullName: 'Leh',
    state: 'Ladakh',
    type: 'tourist',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    timezone: 'Asia/Kolkata',
    description: 'High-altitude desert with Buddhist monasteries, stunning landscapes, and adventure activities',
    popularFor: ['Monasteries', 'Adventure', 'Scenic Beauty', 'Biking', 'Photography', 'Pangong Lake'],
    bestTimeToVisit: { months: ['May', 'Jun', 'Jul', 'Aug', 'Sep'], season: 'Summer' },
    weather: { summer: '3-25°C', winter: '-15-5°C' },
    averageDailyBudget: { budget: 2000, midRange: 3500, luxury: 8000 },
    transport: {
      hasAirport: true,
      airportCode: 'IXL',
      airportName: 'Kushok Bakula Rimpochee Airport',
      hasRailway: false,
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Pangong Lake', type: 'Lake', entryFee: 400, duration: 'Full day' },
      { name: 'Nubra Valley', type: 'Valley', entryFee: 400, duration: 'Full day' },
      { name: 'Thiksey Monastery', type: 'Religious', entryFee: 50, duration: '2 hours' },
      { name: 'Magnetic Hill', type: 'Attraction', entryFee: 0, duration: '1 hour' },
      { name: 'Khardung La', type: 'Pass', entryFee: 0, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/leh.jpg'
  },
  {
    id: 'SHL',
    code: 'SHL',
    name: 'Shimla',
    fullName: 'Shimla',
    state: 'Himachal Pradesh',
    type: 'tourist',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    timezone: 'Asia/Kolkata',
    description: 'Queen of Hills with colonial charm, Mall Road, and panoramic mountain views',
    popularFor: ['Hills', 'Colonial Architecture', 'Mall Road', 'Snow', 'Toy Train'],
    bestTimeToVisit: { months: ['Mar', 'Apr', 'May', 'Jun', 'Dec', 'Jan'], season: 'Summer & Winter' },
    weather: { summer: '15-30°C', winter: '-2-12°C', monsoon: '12-20°C' },
    averageDailyBudget: { budget: 1200, midRange: 2800, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'SLV',
      airportName: 'Shimla Airport',
      hasRailway: true,
      railwayStations: ['Shimla'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'The Ridge', type: 'Landmark', entryFee: 0, duration: '2-3 hours' },
      { name: 'Mall Road', type: 'Shopping', entryFee: 0, duration: '3-4 hours' },
      { name: 'Jakhu Temple', type: 'Religious', entryFee: 0, duration: '2 hours' },
      { name: 'Kufri', type: 'Hill Station', entryFee: 0, duration: '4-5 hours' }
    ],
    imageUrl: '/images/cities/shimla.jpg'
  },
  {
    id: 'ATR',
    code: 'ATR',
    name: 'Amritsar',
    fullName: 'Amritsar',
    state: 'Punjab',
    type: 'tourist',
    coordinates: { lat: 31.6340, lng: 74.8723 },
    timezone: 'Asia/Kolkata',
    description: 'Holy city with the Golden Temple, Wagah Border ceremony, and rich Punjabi culture',
    popularFor: ['Golden Temple', 'Wagah Border', 'Food', 'History', 'Punjabi Culture'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '4-18°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'ATQ',
      airportName: 'Sri Guru Ram Dass Jee International Airport',
      hasRailway: true,
      railwayStations: ['Amritsar Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Golden Temple', type: 'Religious', entryFee: 0, duration: '3-4 hours' },
      { name: 'Wagah Border', type: 'Landmark', entryFee: 0, duration: '3-4 hours' },
      { name: 'Jallianwala Bagh', type: 'Memorial', entryFee: 0, duration: '1-2 hours' },
      { name: 'Partition Museum', type: 'Museum', entryFee: 10, duration: '2 hours' }
    ],
    imageUrl: '/images/cities/amritsar.jpg'
  },
  {
    id: 'IXB',
    code: 'IXB',
    name: 'Darjeeling',
    fullName: 'Darjeeling',
    state: 'West Bengal',
    type: 'tourist',
    coordinates: { lat: 27.0410, lng: 88.2663 },
    timezone: 'Asia/Kolkata',
    description: 'Queen of Hills with tea gardens, toy train, and stunning views of Kanchenjunga',
    popularFor: ['Tea Gardens', 'Toy Train', 'Mountains', 'Sunrise', 'Colonial Heritage'],
    bestTimeToVisit: { months: ['Mar', 'Apr', 'May', 'Oct', 'Nov'], season: 'Spring & Autumn' },
    weather: { summer: '10-20°C', winter: '2-10°C', monsoon: '12-18°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 5500 },
    transport: {
      hasAirport: false,
      nearestAirport: { code: 'IXB', name: 'Bagdogra Airport', distance: '70 km' },
      hasRailway: true,
      railwayStations: ['Darjeeling', 'New Jalpaiguri'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Tiger Hill', type: 'Viewpoint', entryFee: 40, duration: '3 hours' },
      { name: 'Darjeeling Himalayan Railway', type: 'Heritage', entryFee: 100, duration: '2 hours' },
      { name: 'Happy Valley Tea Estate', type: 'Plantation', entryFee: 150, duration: '2 hours' },
      { name: 'Batasia Loop', type: 'Viewpoint', entryFee: 20, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/darjeeling.jpg'
  },
  {
    id: 'IXE',
    code: 'IXE',
    name: 'Mangalore',
    fullName: 'Mangaluru',
    state: 'Karnataka',
    type: 'tier1',
    coordinates: { lat: 12.9141, lng: 74.8560 },
    timezone: 'Asia/Kolkata',
    description: 'Coastal city known for beaches, temples, and unique Mangalorean cuisine',
    popularFor: ['Beaches', 'Temples', 'Seafood', 'Education'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-35°C', winter: '20-32°C', monsoon: '23-30°C' },
    averageDailyBudget: { budget: 1000, midRange: 2200, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'IXE',
      airportName: 'Mangalore International Airport',
      hasRailway: true,
      railwayStations: ['Mangalore Central', 'Mangalore Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Panambur Beach', type: 'Beach', entryFee: 0, duration: '2-3 hours' },
      { name: 'Kudroli Gokarnath Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'St. Aloysius Chapel', type: 'Religious', entryFee: 0, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/mangalore.jpg'
  },
  {
    id: 'IXZ',
    code: 'IXZ',
    name: 'Port Blair',
    fullName: 'Port Blair',
    state: 'Andaman & Nicobar Islands',
    type: 'tourist',
    coordinates: { lat: 11.6234, lng: 92.7265 },
    timezone: 'Asia/Kolkata',
    description: 'Island paradise with pristine beaches, coral reefs, and colonial history',
    popularFor: ['Beaches', 'Scuba Diving', 'Cellular Jail', 'Water Sports', 'Islands'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], season: 'October to May' },
    weather: { summer: '25-32°C', winter: '23-30°C', monsoon: '24-30°C' },
    averageDailyBudget: { budget: 2000, midRange: 4000, luxury: 10000 },
    transport: {
      hasAirport: true,
      airportCode: 'IXZ',
      airportName: 'Veer Savarkar International Airport',
      hasRailway: false,
      hasBusTerminal: true,
      hasFerry: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Cellular Jail', type: 'Memorial', entryFee: 30, duration: '2-3 hours' },
      { name: 'Radhanagar Beach', type: 'Beach', entryFee: 0, duration: '4-5 hours' },
      { name: 'Ross Island', type: 'Island', entryFee: 50, duration: '3-4 hours' },
      { name: 'North Bay Island', type: 'Island', entryFee: 0, duration: '4-5 hours' }
    ],
    imageUrl: '/images/cities/portblair.jpg'
  },
  {
    id: 'RIK',
    code: 'RIK',
    name: 'Rishikesh',
    fullName: 'Rishikesh',
    state: 'Uttarakhand',
    type: 'tourist',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    timezone: 'Asia/Kolkata',
    description: 'Yoga capital of the world with adventure activities, ashrams, and spiritual retreats',
    popularFor: ['Yoga', 'Rafting', 'Adventure', 'Spirituality', 'Beatles Ashram'],
    bestTimeToVisit: { months: ['Sep', 'Oct', 'Nov', 'Feb', 'Mar', 'Apr', 'May'], season: 'Autumn & Spring' },
    weather: { summer: '20-35°C', winter: '5-20°C', monsoon: '20-30°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 5000 },
    transport: {
      hasAirport: false,
      nearestAirport: { code: 'DED', name: 'Jolly Grant Airport', distance: '35 km' },
      hasRailway: true,
      railwayStations: ['Rishikesh', 'Haridwar Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Laxman Jhula', type: 'Landmark', entryFee: 0, duration: '1-2 hours' },
      { name: 'Ram Jhula', type: 'Landmark', entryFee: 0, duration: '1-2 hours' },
      { name: 'Triveni Ghat', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Beatles Ashram', type: 'Heritage', entryFee: 150, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/rishikesh.jpg'
  },

  // Tier-1 Cities
  {
    id: 'PNQ',
    code: 'PNQ',
    name: 'Pune',
    fullName: 'Pune',
    state: 'Maharashtra',
    type: 'tier1',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    timezone: 'Asia/Kolkata',
    description: 'Cultural capital of Maharashtra with a vibrant student population, IT industry, and historical sites',
    popularFor: ['Education', 'IT Parks', 'Shivaji History', 'Street Food', 'Nightlife'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '20-40°C', winter: '10-28°C', monsoon: '20-30°C' },
    averageDailyBudget: { budget: 1200, midRange: 2800, luxury: 7000 },
    transport: {
      hasAirport: true,
      airportCode: 'PNQ',
      airportName: 'Pune International Airport',
      hasRailway: true,
      railwayStations: ['Pune Junction', 'Shivajinagar', 'Khadki'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Shaniwar Wada', type: 'Fort', entryFee: 25, duration: '1-2 hours' },
      { name: 'Aga Khan Palace', type: 'Palace', entryFee: 25, duration: '1-2 hours' },
      { name: 'Sinhagad Fort', type: 'Fort', entryFee: 40, duration: '3-4 hours' },
      { name: 'Osho Ashram', type: 'Spiritual', entryFee: 600, duration: 'Half day' }
    ],
    imageUrl: '/images/cities/pune.jpg'
  },
  {
    id: 'AMD',
    code: 'AMD',
    name: 'Ahmedabad',
    fullName: 'Ahmedabad',
    state: 'Gujarat',
    type: 'tier1',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    timezone: 'Asia/Kolkata',
    description: 'UNESCO World Heritage City with remarkable textile heritage, food culture, and Sabarmati Ashram',
    popularFor: ['Heritage Walk', 'Street Food', 'Sabarmati Ashram', 'Textiles', 'Kite Festival'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '11-28°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'AMD',
      airportName: 'Sardar Vallabhbhai Patel International Airport',
      hasRailway: true,
      railwayStations: ['Ahmedabad Junction', 'Sabarmati'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Sabarmati Ashram', type: 'Heritage', entryFee: 0, duration: '2 hours' },
      { name: 'Adalaj Stepwell', type: 'Monument', entryFee: 0, duration: '1-2 hours' },
      { name: 'Akshardham Temple', type: 'Religious', entryFee: 0, duration: '3-4 hours' },
      { name: 'Kankaria Lake', type: 'Scenic', entryFee: 25, duration: '3-4 hours' }
    ],
    imageUrl: '/images/cities/ahmedabad.jpg'
  },
  {
    id: 'LKO',
    code: 'LKO',
    name: 'Lucknow',
    fullName: 'Lucknow',
    state: 'Uttar Pradesh',
    type: 'tier1',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    timezone: 'Asia/Kolkata',
    description: 'City of Nawabs with rich culinary heritage, Nawabi architecture, and Chikankari embroidery',
    popularFor: ['Kebabs', 'Nawabi Culture', 'Architecture', 'Chikankari', 'Biryani'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '5-22°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 800, midRange: 2200, luxury: 5500 },
    transport: {
      hasAirport: true,
      airportCode: 'LKO',
      airportName: 'Chaudhary Charan Singh International Airport',
      hasRailway: true,
      railwayStations: ['Lucknow Junction', 'Lucknow NR', 'Aishbagh'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Bara Imambara', type: 'Monument', entryFee: 50, duration: '2-3 hours' },
      { name: 'Chota Imambara', type: 'Monument', entryFee: 25, duration: '1 hour' },
      { name: 'Rumi Darwaza', type: 'Monument', entryFee: 0, duration: '30 minutes' },
      { name: 'Hazratganj Market', type: 'Market', entryFee: 0, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/lucknow.jpg'
  },
  {
    id: 'IDR',
    code: 'IDR',
    name: 'Indore',
    fullName: 'Indore',
    state: 'Madhya Pradesh',
    type: 'tier1',
    coordinates: { lat: 22.7196, lng: 75.8577 },
    timezone: 'Asia/Kolkata',
    description: "India's cleanest city with an amazing street food culture and Rajwada Palace",
    popularFor: ['Street Food', 'Cleanliness', 'Rajwada Palace', 'Sarafa Bazaar Night Market'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-42°C', winter: '10-26°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 4500 },
    transport: {
      hasAirport: true,
      airportCode: 'IDR',
      airportName: 'Devi Ahilya Bai Holkar Airport',
      hasRailway: true,
      railwayStations: ['Indore Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Rajwada Palace', type: 'Palace', entryFee: 10, duration: '1-2 hours' },
      { name: 'Lal Baag Palace', type: 'Palace', entryFee: 50, duration: '1-2 hours' },
      { name: 'Sarafa Bazaar', type: 'Market', entryFee: 0, duration: '3-4 hours' },
      { name: 'Kanch Mandir', type: 'Religious', entryFee: 0, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/indore.jpg'
  },
  {
    id: 'NAG',
    code: 'NAG',
    name: 'Nagpur',
    fullName: 'Nagpur',
    state: 'Maharashtra',
    type: 'tier1',
    coordinates: { lat: 21.1458, lng: 79.0882 },
    timezone: 'Asia/Kolkata',
    description: 'Orange City located at the geographic center of India, gateway to Tadoba tiger reserve',
    popularFor: ['Oranges', 'Central Location', 'Wildlife', 'Tadoba', 'Deekshabhoomi'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'], season: 'Winter' },
    weather: { summer: '28-45°C', winter: '10-28°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 4500 },
    transport: {
      hasAirport: true,
      airportCode: 'NAG',
      airportName: 'Dr. Babasaheb Ambedkar International Airport',
      hasRailway: true,
      railwayStations: ['Nagpur Junction', 'Itwari'],
      hasBusTerminal: true,
      hasMetro: true
    },
    attractions: [
      { name: 'Deekshabhoomi', type: 'Religious', entryFee: 0, duration: '2 hours' },
      { name: 'Ambazari Lake', type: 'Scenic', entryFee: 0, duration: '2 hours' },
      { name: 'Nagpur Zero Mile Stone', type: 'Landmark', entryFee: 0, duration: '30 minutes' },
      { name: 'Futala Lake', type: 'Scenic', entryFee: 0, duration: '2 hours' }
    ],
    imageUrl: '/images/cities/nagpur.jpg'
  },
  {
    id: 'BHO',
    code: 'BHO',
    name: 'Bhopal',
    fullName: 'Bhopal',
    state: 'Madhya Pradesh',
    type: 'tier1',
    coordinates: { lat: 23.2599, lng: 77.4126 },
    timezone: 'Asia/Kolkata',
    description: 'City of Lakes with Mughal-era mosques, Buddhist stupas and natural beauty',
    popularFor: ['Lakes', 'Mosques', 'Sanchi Stupa', 'Museums', 'Van Vihar'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '24-42°C', winter: '8-26°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 4500 },
    transport: {
      hasAirport: true,
      airportCode: 'BHO',
      airportName: 'Raja Bhoj Airport',
      hasRailway: true,
      railwayStations: ['Bhopal Junction', 'Habibganj'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Upper Lake (Bada Talab)', type: 'Lake', entryFee: 0, duration: '2-3 hours' },
      { name: 'Van Vihar National Park', type: 'Wildlife', entryFee: 40, duration: '3-4 hours' },
      { name: 'Bharat Bhavan', type: 'Art', entryFee: 20, duration: '2 hours' },
      { name: 'Sanchi Stupa', type: 'Monument', entryFee: 40, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/bhopal.jpg'
  },
  {
    id: 'VTZ',
    code: 'VTZ',
    name: 'Visakhapatnam',
    fullName: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    type: 'tier1',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    timezone: 'Asia/Kolkata',
    description: 'Port city on the Bay of Bengal with pristine beaches, hills, and submarine museum',
    popularFor: ['Beaches', 'Hills', 'Navy Museum', 'Araku Valley', 'Seafood'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-40°C', winter: '18-30°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 1000, midRange: 2200, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'VTZ',
      airportName: 'Visakhapatnam Airport',
      hasRailway: true,
      railwayStations: ['Visakhapatnam Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'RK Beach', type: 'Beach', entryFee: 0, duration: '3-4 hours' },
      { name: 'Submarine Museum', type: 'Museum', entryFee: 40, duration: '1-2 hours' },
      { name: 'Kailasagiri Hill Park', type: 'Park', entryFee: 40, duration: '3-4 hours' },
      { name: 'Araku Valley', type: 'Scenic', entryFee: 0, duration: 'Full day' }
    ],
    imageUrl: '/images/cities/visakhapatnam.jpg'
  },
  {
    id: 'MYQ',
    code: 'MYQ',
    name: 'Mysore',
    fullName: 'Mysuru',
    state: 'Karnataka',
    type: 'tourist',
    coordinates: { lat: 12.2958, lng: 76.6394 },
    timezone: 'Asia/Kolkata',
    description: 'Royal city with magnificent Mysore Palace, silk sarees, and the grand Dasara festival',
    popularFor: ['Mysore Palace', 'Silk', 'Yoga', 'Dasara Festival', 'Sandalwood'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'], season: 'Winter' },
    weather: { summer: '20-35°C', winter: '14-28°C', monsoon: '18-28°C' },
    averageDailyBudget: { budget: 1000, midRange: 2200, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'MYQ',
      airportName: 'Mysore Airport',
      hasRailway: true,
      railwayStations: ['Mysuru Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Mysore Palace', type: 'Palace', entryFee: 100, duration: '3-4 hours' },
      { name: 'Chamundi Hills', type: 'Religious', entryFee: 0, duration: '2-3 hours' },
      { name: 'Brindavan Gardens', type: 'Garden', entryFee: 40, duration: '2 hours' },
      { name: "St. Philomena's Cathedral", type: 'Religious', entryFee: 0, duration: '1 hour' }
    ],
    imageUrl: '/images/cities/mysore.jpg'
  },
  {
    id: 'JSA',
    code: 'JSA',
    name: 'Jaisalmer',
    fullName: 'Jaisalmer (Golden City)',
    state: 'Rajasthan',
    type: 'tourist',
    coordinates: { lat: 26.9157, lng: 70.9083 },
    timezone: 'Asia/Kolkata',
    description: 'Golden City with towering sand dunes, camel safaris, and a living medieval fort',
    popularFor: ['Desert Safari', 'Fort', 'Havelis', 'Camel Rides', 'Dunes'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-48°C', winter: '5-25°C', monsoon: '26-35°C' },
    averageDailyBudget: { budget: 1200, midRange: 2500, luxury: 7000 },
    transport: {
      hasAirport: true,
      airportCode: 'JSA',
      airportName: 'Jaisalmer Airport',
      hasRailway: true,
      railwayStations: ['Jaisalmer'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Jaisalmer Fort', type: 'Fort', entryFee: 0, duration: '3-4 hours' },
      { name: 'Sam Sand Dunes', type: 'Natural', entryFee: 0, duration: '4-5 hours' },
      { name: 'Patwon Ki Haveli', type: 'Heritage', entryFee: 100, duration: '1-2 hours' },
      { name: 'Gadisar Lake', type: 'Lake', entryFee: 0, duration: '1-2 hours' }
    ],
    imageUrl: '/images/cities/jaisalmer.jpg'
  },
  {
    id: 'JDH',
    code: 'JDH',
    name: 'Jodhpur',
    fullName: 'Jodhpur (Blue City)',
    state: 'Rajasthan',
    type: 'tourist',
    coordinates: { lat: 26.2389, lng: 73.0243 },
    timezone: 'Asia/Kolkata',
    description: 'Blue City with the imposing Mehrangarh Fort, blue-painted houses, and vibrant bazaars',
    popularFor: ['Mehrangarh Fort', 'Blue Houses', 'Handicrafts', 'Food', 'Umaid Bhawan'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '25-45°C', winter: '6-26°C', monsoon: '25-35°C' },
    averageDailyBudget: { budget: 1000, midRange: 2300, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'JDH',
      airportName: 'Jodhpur Airport',
      hasRailway: true,
      railwayStations: ['Jodhpur Junction'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Mehrangarh Fort', type: 'Fort', entryFee: 100, duration: '3-4 hours' },
      { name: 'Umaid Bhawan Palace', type: 'Palace', entryFee: 100, duration: '2 hours' },
      { name: 'Jaswant Thada', type: 'Monument', entryFee: 30, duration: '1 hour' },
      { name: 'Clock Tower Bazaar', type: 'Market', entryFee: 0, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/jodhpur.jpg'
  },
  {
    id: 'CJB',
    code: 'CJB',
    name: 'Coimbatore',
    fullName: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'tier1',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    timezone: 'Asia/Kolkata',
    description: 'Manchester of South India, gateway to Ooty and Munnar with temples and industrial heritage',
    popularFor: ['Temples', 'Industries', 'Gateway to Ooty', 'Isha Yoga Center'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '22-38°C', winter: '18-30°C', monsoon: '20-28°C' },
    averageDailyBudget: { budget: 800, midRange: 2000, luxury: 4500 },
    transport: {
      hasAirport: true,
      airportCode: 'CJB',
      airportName: 'Coimbatore International Airport',
      hasRailway: true,
      railwayStations: ['Coimbatore Junction', 'Coimbatore North'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Isha Yoga Center', type: 'Spiritual', entryFee: 0, duration: '3-4 hours' },
      { name: 'Marudamalai Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Ooty (Day Trip)', type: 'Hill Station', entryFee: 0, duration: 'Full day' },
      { name: 'Black Thunder Water Park', type: 'Entertainment', entryFee: 500, duration: 'Full day' }
    ],
    imageUrl: '/images/cities/coimbatore.jpg'
  },
  {
    id: 'GAU',
    code: 'GAU',
    name: 'Guwahati',
    fullName: 'Guwahati',
    state: 'Assam',
    type: 'tier1',
    coordinates: { lat: 26.1445, lng: 91.7362 },
    timezone: 'Asia/Kolkata',
    description: 'Gateway to Northeast India on the banks of the Brahmaputra, gateway to Kaziranga',
    popularFor: ['Kamakhya Temple', 'Brahmaputra River', 'Gateway to NE India', 'Kaziranga'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'], season: 'Winter & Spring' },
    weather: { summer: '22-35°C', winter: '10-22°C', monsoon: '22-30°C' },
    averageDailyBudget: { budget: 1000, midRange: 2200, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'GAU',
      airportName: 'Lokpriya Gopinath Bordoloi International Airport',
      hasRailway: true,
      railwayStations: ['Guwahati'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Kamakhya Temple', type: 'Religious', entryFee: 0, duration: '2-3 hours' },
      { name: 'Umananda Island', type: 'Religious', entryFee: 20, duration: '2-3 hours' },
      { name: 'Assam State Museum', type: 'Museum', entryFee: 20, duration: '2 hours' },
      { name: 'Pobitora Wildlife Sanctuary', type: 'Wildlife', entryFee: 50, duration: 'Full day' }
    ],
    imageUrl: '/images/cities/guwahati.jpg'
  },
  {
    id: 'PAT',
    code: 'PAT',
    name: 'Patna',
    fullName: 'Patna',
    state: 'Bihar',
    type: 'tier1',
    coordinates: { lat: 25.5941, lng: 85.1376 },
    timezone: 'Asia/Kolkata',
    description: 'Ancient city on the Ganges, once capital of the Maurya Empire, near Bodh Gaya',
    popularFor: ['History', 'Ganga Ghats', 'Near Bodh Gaya', 'Nalanda', 'Food'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '28-44°C', winter: '8-22°C', monsoon: '26-35°C' },
    averageDailyBudget: { budget: 700, midRange: 1800, luxury: 4000 },
    transport: {
      hasAirport: true,
      airportCode: 'PAT',
      airportName: 'Jay Prakash Narayan International Airport',
      hasRailway: true,
      railwayStations: ['Patna Junction', 'Patna Sahib'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Golghar', type: 'Monument', entryFee: 10, duration: '1 hour' },
      { name: 'Mahavir Mandir', type: 'Religious', entryFee: 0, duration: '1 hour' },
      { name: 'Patna Museum', type: 'Museum', entryFee: 15, duration: '2 hours' },
      { name: 'Bodh Gaya (Day Trip)', type: 'Religious', entryFee: 0, duration: 'Full day' }
    ],
    imageUrl: '/images/cities/patna.jpg'
  },
  {
    id: 'IXC',
    code: 'IXC',
    name: 'Chandigarh',
    fullName: 'Chandigarh',
    state: 'Chandigarh',
    type: 'tier1',
    coordinates: { lat: 30.7333, lng: 76.7794 },
    timezone: 'Asia/Kolkata',
    description: 'Planned city designed by Le Corbusier, known for its cleanliness, Rock Garden, and Rose Garden',
    popularFor: ['Rock Garden', 'Rose Garden', 'Planned City', 'Sukhna Lake', 'Food'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '24-42°C', winter: '5-20°C', monsoon: '22-32°C' },
    averageDailyBudget: { budget: 1000, midRange: 2500, luxury: 6000 },
    transport: {
      hasAirport: true,
      airportCode: 'IXC',
      airportName: 'Chandigarh International Airport',
      hasRailway: true,
      railwayStations: ['Chandigarh'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Rock Garden', type: 'Art', entryFee: 30, duration: '2-3 hours' },
      { name: 'Rose Garden', type: 'Garden', entryFee: 30, duration: '1-2 hours' },
      { name: 'Sukhna Lake', type: 'Scenic', entryFee: 0, duration: '2 hours' },
      { name: 'Capitol Complex', type: 'Architecture', entryFee: 0, duration: '1-2 hours' }
    ],
    imageUrl: '/images/cities/chandigarh.jpg'
  },
  {
    id: 'BBI',
    code: 'BBI',
    name: 'Bhubaneswar',
    fullName: 'Bhubaneswar',
    state: 'Odisha',
    type: 'tier1',
    coordinates: { lat: 20.2961, lng: 85.8245 },
    timezone: 'Asia/Kolkata',
    description: 'Temple city of Odisha near Puri and Konark, known for ancient temples and classical dance',
    popularFor: ['Temples', 'Puri Beach', 'Konark Sun Temple', 'Odissi Dance', 'Handicrafts'],
    bestTimeToVisit: { months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], season: 'Winter' },
    weather: { summer: '28-42°C', winter: '14-28°C', monsoon: '24-32°C' },
    averageDailyBudget: { budget: 900, midRange: 2200, luxury: 5000 },
    transport: {
      hasAirport: true,
      airportCode: 'BBI',
      airportName: 'Biju Patnaik International Airport',
      hasRailway: true,
      railwayStations: ['Bhubaneswar'],
      hasBusTerminal: true,
      hasMetro: false
    },
    attractions: [
      { name: 'Lingaraj Temple', type: 'Religious', entryFee: 0, duration: '1-2 hours' },
      { name: 'Udayagiri & Khandagiri Caves', type: 'Monument', entryFee: 25, duration: '2-3 hours' },
      { name: 'Nandankanan Zoological Park', type: 'Wildlife', entryFee: 100, duration: '4-5 hours' },
      { name: 'Konark Sun Temple', type: 'Monument', entryFee: 40, duration: '2-3 hours' }
    ],
    imageUrl: '/images/cities/bhubaneswar.jpg'
  }
];

// Search cities by name, state, or popular features
const searchCities = (query) => {
  const lowerQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.fullName.toLowerCase().includes(lowerQuery) ||
    city.state.toLowerCase().includes(lowerQuery) ||
    city.popularFor.some(feature => feature.toLowerCase().includes(lowerQuery))
  );
};

// Get city by code or name
const getCityByCode = (codeOrName) => {
  if (!codeOrName) return null;
  const upper = codeOrName.toUpperCase();
  const lower = codeOrName.toLowerCase();
  return cities.find(city => 
    city.code === upper || 
    city.id === upper || 
    city.name.toLowerCase() === lower ||
    city.fullName.toLowerCase() === lower
  );
};

// Get cities by type
const getCitiesByType = (type) => {
  return cities.filter(city => city.type === type);
};

// Get cities by state
const getCitiesByState = (state) => {
  return cities.filter(city => city.state.toLowerCase() === state.toLowerCase());
};

// Get all cities with airports
const getCitiesWithAirports = () => {
  return cities.filter(city => city.transport.hasAirport);
};

// Get all cities with railway stations
const getCitiesWithRailways = () => {
  return cities.filter(city => city.transport.hasRailway);
};

module.exports = {
  cities,
  searchCities,
  getCityByCode,
  getCitiesByType,
  getCitiesByState,
  getCitiesWithAirports,
  getCitiesWithRailways
};
