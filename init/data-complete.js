const data = [
  // TRENDING (5)
  {
    title: "Cozy Beachfront Cottage",
    description: "Charming beachfront cottage with ocean views. Perfect for couples.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending"
  },
  {
    title: "Luxury Penthouse City Views",
    description: "Stunning penthouse with panoramic city skyline.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Trending"
  },
  {
    title: "Desert Luxury Camp",
    description: "Glamping in Sahara with premium amenities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2400,
    location: "Merzouga",
    country: "Morocco",
    category: "Trending"
  },
  {
    title: "Viral Treehouse Escape",
    description: "Trending treehouse with forest views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 900,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Trending"
  },
  {
    title: "Urban Trendy Loft",
    description: "Instagram-famous loft in hip neighborhood.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Brooklyn",
    country: "United States",
    category: "Trending"
  },

  // ROOMS (5)
  {
    title: "Modern Loft Room NYC",
    description: "Private room in stylish downtown loft.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Rooms"
  },
  {
    title: "Boutique Hotel Room Barcelona",
    description: "Chic room in Gothic Quarter.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 950,
    location: "Barcelona",
    country: "Spain",
    category: "Rooms"
  },
  {
    title: "Japanese Ryokan Room",
    description: "Traditional tatami room experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Kyoto",
    country: "Japan",
    category: "Rooms"
  },
  {
    title: "Cozy Room in Paris",
    description: "Charming attic room near Eiffel Tower.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Paris",
    country: "France",
    category: "Rooms"
  },
  {
    title: "Private Room Sydney Harbour",
    description: "Room with harbour bridge views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1540553016722-983e7dd45f7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1300,
    location: "Sydney",
    country: "Australia",
    category: "Rooms"
  },

  // APARTMENTS (5)
  {
    title: "Tuscan Historic Villa",
    description: "Vineyard views in Florence.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Apartments"
  },
  {
    title: "Amsterdam Canal Apartment",
    description: "Historic canal house apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Apartments"
  },
  {
    title: "London Penthouse Apartment",
    description: "Modern apartment with Thames views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1564078512254-f3f4e0f8f8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3200,
    location: "London",
    country: "United Kingdom",
    category: "Apartments"
  },
  {
    title: "Berlin Industrial Loft Apartment",
    description: "Converted factory apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Berlin",
    country: "Germany",
    category: "Apartments"
  },
  {
    title: "Tokyo Micro Apartment",
    description: "Efficient, modern Tokyo apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1615597938175-c96eecb239dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1900,
    location: "Tokyo",
    country: "Japan",
    category: "Apartments"
  },

  // MOUNTAINS (5)
  {
    title: "Aspen Mountain Cabin",
    description: "Peaceful mountain retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains"
  },
  {
    title: "Swiss Alps Chalet",
    description: "Ski-in/ski-out luxury chalet.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains"
  },
  {
    title: "Canadian Rockies Lodge",
    description: "Rustic lodge with mountain views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1551524160-34a3011ee68e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Banff",
    country: "Canada",
    category: "Mountains"
  },
  {
    title: "Dolomites Mountain Hut",
    description: "Cozy hut in Italian Dolomites.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533929738458-4d0161d5558e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "Cortina",
    country: "Italy",
    category: "Mountains"
  },
  {
    title: "New Zealand Alpine Cabin",
    description: "Alpine cabin near adventure activities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1515338790333-3b6183a1c33a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1700,
    location: "Queenstown",
    country: "New Zealand",
    category: "Mountains"
  },

  // BEACHFRONT (5)
  {
    title: "Cancun Beachfront Paradise",
    description: "Direct beach access condo.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beachfront"
  },
  {
    title: "Maldives Tropical Bungalow",
    description: "Overwater bungalow paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Maldives",
    country: "Maldives",
    category: "Beachfront"
  },
  {
    title: "Santorini Beach Villa",
    description: "Whitewashed villa on black sand beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Santorini",
    country: "Greece",
    category: "Beachfront"
  },
  {
    title: "Bali Beachfront Villa",
    description: "Private villa on Seminyak beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1568014084-4bbc68f8ad68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Seminyak",
    country: "Indonesia",
    category: "Beachfront"
  },
  {
    title: "Hawaii Oceanfront Cottage",
    description: "Classic Hawaiian beach cottage.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2600,
    location: "Maui",
    country: "United States",
    category: "Beachfront"
  },

  // AMAZING POOL (5)
  {
    title: "Bali Infinity Pool Villa",
    description: "Luxury villa with infinity pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Ubud",
    country: "Indonesia",
    category: "Amazing Pool"
  },
  {
    title: "Miami Olympic Pool Villa",
    description: "Resort-style pool in sunny Miami.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1428602953914-34cf0cb64d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Miami",
    country: "United States",
    category: "Amazing Pool"
  },
  {
    title: "Ibiza Cliffside Pool Villa",
    description: "Infinity pool overlooking Mediterranean.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1564116833655-cd56859ee75d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3800,
    location: "Ibiza",
    country: "Spain",
    category: "Amazing Pool"
  },
  {
    title: "Cape Town Pool Penthouse",
    description: "Rooftop pool with Table Mountain views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1608822228968-47b96840b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2900,
    location: "Cape Town",
    country: "South Africa",
    category: "Amazing Pool"
  },
  {
    title: "Thailand Jungle Pool Villa",
    description: "Private pool surrounded by jungle.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2100,
    location: "Krabi",
    country: "Thailand",
    category: "Amazing Pool"
  },

  // KITCHEN (5)
  {
    title: "Lyon Chef's Kitchen House",
    description: "Premium kitchen for cooking enthusiasts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Lyon",
    country: "France",
    category: "Kitchen"
  },
  {
    title: "Provence Organic Farm Kitchen",
    description: "Farm-to-table with organic garden.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521028065351-20bed32659d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Provence",
    country: "France",
    category: "Kitchen"
  },
  {
    title: "Italian Cooking Villa Sicily",
    description: "Kitchen designed for pasta making.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1700,
    location: "Taormina",
    country: "Italy",
    category: "Kitchen"
  },
  {
    title: "Mexican Cooking Hacienda",
    description: "Traditional kitchen for authentic tacos.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1615484478156-bab861ad18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Oaxaca",
    country: "Mexico",
    category: "Kitchen"
  },
  {
    title: "BBQ Master Cabin Smoky Mountains",
    description: "Outdoor kitchen with smoker and grill.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1300,
    location: "Gatlinburg",
    country: "United States",
    category: "Kitchen"
  },

  // DESIGN (5)
  {
    title: "Portland Treehouse Retreat",
    description: "Unique treehouse design in forest.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Design"
  },
  {
    title: "Copenhagen Glass Pavilion",
    description: "Contemporary glass architecture.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Copenhagen",
    country: "Denmark",
    category: "Design"
  },
  {
    title: "Joshua Tree Dome House",
    description: "Geodesic dome in desert.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1584905450569-14bb4c5eeac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1900,
    location: "Joshua Tree",
    country: "United States",
    category: "Design"
  },
  {
    title: "Shipping Container Home",
    description: "Sustainable container architecture.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Cape Town",
    country: "South Africa",
    category: "Design"
  },
  {
    title: "Earthship Eco House",
    description: "Off-grid earthship design.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582268611958-ebfd171ef6f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Taos",
    country: "United States",
    category: "Design"
  },

  // FAVORITES (5)
  {
    title: "Cotswolds Charming Cottage",
    description: "Picturesque English countryside cottage.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1610641818490-a6f6f57ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 1350,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Favorites"
  },
  {
    title: "Lake Como Villa Italy",
    description: "Elegant villa on Lake Como.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1604443262258-77db0d5e0c9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 4200,
    location: "Bellagio",
    country: "Italy",
    category: "Favorites"
  },
  {
    title: "Amalfi Coast Cliff House",
    description: "Dream house on Amalfi cliffs.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 3600,
    location: "Positano",
    country: "Italy",
    category: "Favorites"
  },
  {
    title: "Scottish Highlands Castle",
    description: "Private castle stay in Highlands.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 5000,
    location: "Isle of Skye",
    country: "United Kingdom",
    category: "Favorites"
  },
  {
    title: "Banff Lakefront Cabin",
    description: "Iconic turquoise lake cabin.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1560272562-c9f360f35133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
    price: 2400,
    location: "Lake Louise",
    country: "Canada",
    category: "Favorites"
  }
];

module.exports = { data };

