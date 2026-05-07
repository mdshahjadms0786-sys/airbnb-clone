require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing');

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGODB_URL || process.env.DB_URL;

// Complete city coordinates map
const coordsMap = {
  // By city name (partial match)
  "new york": [-74.0060, 40.7128],
  "manhattan": [-74.0060, 40.7128],
  "miami": [-80.1300, 25.7907],
  "big sur": [-121.7800, 36.2704],
  "los angeles": [-118.2437, 34.0522],
  "san francisco": [-122.4194, 37.7749],
  "las vegas": [-115.1398, 36.1699],
  "beverly hills": [-118.4004, 34.0736],
  "aspen": [-106.8175, 39.1911],
  "portland": [-122.6765, 45.5231],
  "chicago": [-87.6298, 41.8781],
  "marrakech": [-7.9811, 31.6295],
  "morocco": [-7.9811, 31.6295],
  "dubai": [55.2708, 25.2048],
  "abu dhabi": [54.3773, 24.4539],
  "singapore": [103.8198, 1.3521],
  "amsterdam": [4.9041, 52.3676],
  "chamonix": [6.8696, 45.9237],
  "monte carlo": [7.4246, 43.7384],
  "monaco": [7.4246, 43.7384],
  "paris": [2.3522, 48.8566],
  "barcelona": [2.1734, 41.3851],
  "madrid": [-3.7038, 40.4168],
  "ibiza": [1.4221, 38.9067],
  "mallorca": [2.6502, 39.6953],
  "granada": [-3.5986, 37.1773],
  "kyoto": [135.7681, 35.0116],
  "tokyo": [139.6917, 35.6895],
  "osaka": [135.5023, 34.6937],
  "seoul": [126.9780, 37.5665],
  "singapore": [103.8198, 1.3521],
  "santorini": [25.4319, 36.3932],
  "oia": [25.3750, 36.4618],
  "mykonos": [25.3290, 37.4467],
  "athens": [23.7275, 37.9838],
  "edinburgh": [-3.1883, 55.9533],
  "london": [-0.1276, 51.5074],
  "cotswolds": [-1.8433, 51.8330],
  "isle of skye": [-6.2000, 57.2700],
  "scotland": [-4.2026, 57.4596],
  "bali": [115.1889, -8.4095],
  "lombok": [116.3214, -8.6500],
  "phuket": [98.3923, 7.8804],
  "ko samui": [100.0630, 9.5120],
  "maldives": [73.2207, 3.2028],
  "seychelles": [55.4920, -4.6796],
  "prague": [14.4208, 50.0880],
  "vienna": [16.3738, 48.2082],
  "budapest": [19.0402, 47.4979],
  "hallstatt": [13.6493, 47.5622],
  "innsbruck": [11.4041, 47.2692],
  "salzburg": [13.0550, 47.8095],
  "lisbon": [-9.1393, 38.7223],
  "rome": [12.4964, 41.9028],
  "milan": [9.1900, 45.4654],
  "florence": [11.2558, 43.7711],
  "tuscany": [11.2558, 43.7711],
  "amalfi": [14.6027, 40.6340],
  "positano": [14.4874, 40.6281],
  "cinque terre": [9.7155, 44.1461],
  "lake como": [9.2624, 45.9937],
  "bologna": [11.3426, 44.4949],
  "dolomites": [11.8767, 46.4102],
  "cortina": [12.1357, 46.5405],
  "matera": [16.6027, 40.6640],
  "berlin": [13.4050, 52.5200],
  "munich": [11.5820, 48.1351],
  "zurich": [8.5417, 47.3769],
  "interlaken": [7.8632, 46.6863],
  "zermatt": [7.7491, 46.0207],
  "davos": [9.8355, 46.8027],
  "swiss alps": [7.6657, 46.5197],
  "switzerland": [8.2275, 46.8182],
  "stockholm": [18.0686, 59.3293],
  "helsinki": [24.9384, 60.1699],
  "copenhagen": [12.5683, 55.6761],
  "oslo": [10.7522, 59.9139],
  "reykjavik": [-21.9426, 64.1466],
  "lulea": [22.1567, 65.5848],
  "kuopio": [27.6782, 62.8924],
  "lyon": [4.8357, 45.7640],
  "toulouse": [1.4442, 43.6047],
  "nice": [7.2620, 43.7102],
  "st. tropez": [6.6403, 43.2677],
  "provence": [5.3698, 43.8367],
  "bruges": [3.2247, 51.2093],
  "antwerp": [4.4024, 51.2194],
  "rotterdam": [4.4777, 51.9244],
  "sydney": [151.2093, -33.8688],
  "melbourne": [144.9631, -37.8136],
  "queenstown": [168.6626, -45.0312],
  "wellington": [174.7762, -41.2865],
  "toronto": [-79.3832, 43.6532],
  "montreal": [-73.5673, 45.5017],
  "vancouver": [-123.1207, 49.2827],
  "banff": [-115.5708, 51.1784],
  "whistler": [-122.9574, 50.1163],
  "lake louise": [-116.1773, 51.4254],
  "cancun": [-86.8515, 21.1619],
  "tulum": [-87.4654, 20.2114],
  "playa del carmen": [-87.0739, 20.6296],
  "cabo san lucas": [-109.9167, 22.8905],
  "mexico city": [-99.1332, 19.4326],
  "buenos aires": [-58.3816, -34.6037],
  "cape town": [18.4241, -33.9249],
  "mumbai": [72.8777, 19.0760],
  "bora bora": [-151.7415, -16.5004],
  "costa rica": [-84.0739, 9.7489],
  "dubrovnik": [18.0944, 42.6507],
  "palm springs": [-116.5453, 33.8303],
  "lake district": [-3.1410, 54.4609],
  // Additional missing locations
  "jukkasjärvi": [20.5937, 67.8558],
  "jukan": [20.5937, 67.8558],
  "canggu": [115.1389, -8.6478],
  "seminyak": [115.1628, -8.6910],
  "ubud": [115.2625, -8.5069],
  "merzouga": [-4.0131, 31.0808],
  "inverness": [-4.2247, 57.4791],
  "monteverde": [-84.8171, 10.3157],
  "verbier": [7.3061, 46.1938],
  "torres del paine": [-72.9666, -51.2538],
  "namche bazaar": [86.7314, 27.8069],
  "estes park": [-105.5217, 40.3772],
  "baqueira": [0.0654, 42.6282],
  "glen affric": [-4.8833, 57.2333],
  "canmore": [-115.3529, 51.0892],
  "milford sound": [167.8983, -44.6414],
  "st. lawrence gap": [-59.5667, 13.0667],
  "hvar": [16.4419, 43.1734],
  "arugam bay": [81.8382, 6.8554],
  "zanzibar": [39.3404, -6.1659],
  "nosy be": [48.3201, -13.3192],
  "cala comte": [1.2881, 38.9083],
  "khao sok": [98.5297, 8.9167],
  "sagres": [-8.9403, 37.0194],
  "sapa": [103.8440, 22.4917],
  "uluru": [131.0369, -25.3444],
  "gordes": [5.2699, 43.9129],
  "cefalù": [14.0204, 38.0336],
  "oaxaca": [-96.6699, 17.0732],
  "gatlinburg": [-83.5182, 35.7148],
  "goa": [74.1240, 15.2993],
  "istanbul": [28.9784, 41.0082],
  "paros": [25.1114, 37.0853],
  "lima": [-77.0428, -12.0464],
  "bangkok": [100.5018, 13.7563],
  "naples": [14.2681, 40.8518],
  "joshua tree": [-116.3131, 33.8734],
  "taos": [-105.5734, 36.4072],
  "talkeetna": [-150.1069, 62.3239],
  "montana": [-110.3626, 46.8797],
  "bourton-on-the-water": [-1.7602, 51.9241],
  "bellagio": [9.1573, 46.0160],
  "gasadalur": [-7.5000, 62.1167],
  "lake bled": [14.0939, 46.3625],
  "maui": [-156.3319, 20.7984],
  "faroe": [-6.75, 62.0],
  "gásadalur": [-7.5, 62.1167],
};

function getCoordinates(location, country) {
  const searchStr = (location + ' ' + (country || '')).toLowerCase();
  for (const [key, coords] of Object.entries(coordsMap)) {
    if (searchStr.includes(key)) {
      return coords;
    }
  }
  // Default fallback based on country
  const countryStr = (country || '').toLowerCase();
  if (countryStr.includes('india')) return [78.9629, 20.5937];
  if (countryStr.includes('usa') || countryStr.includes('united states')) return [-98.5795, 39.8283];
  if (countryStr.includes('uk') || countryStr.includes('united kingdom')) return [-3.4359, 55.3781];
  if (countryStr.includes('italy')) return [12.5674, 41.8719];
  if (countryStr.includes('france')) return [2.2137, 46.2276];
  if (countryStr.includes('japan')) return [138.2529, 36.2048];
  if (countryStr.includes('australia')) return [133.7751, -25.2744];
  return [0, 0];
}

async function fixGeometry() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
    
    const listings = await Listing.find({});
    console.log(`Found ${listings.length} listings to update`);
    
    let updated = 0;
    for (const listing of listings) {
      const coords = getCoordinates(listing.location || '', listing.country || '');
      
      await Listing.findByIdAndUpdate(listing._id, {
        $set: {
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }
      });
      updated++;
      console.log(`Updated: ${listing.title} → [${coords}]`);
    }
    
    console.log(`\n✅ Successfully updated ${updated} listings with geometry!`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    mongoose.disconnect();
  }
}

fixGeometry();