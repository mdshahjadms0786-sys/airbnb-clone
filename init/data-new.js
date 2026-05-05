const sampleListings = [
  // TRENDING
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending"
  },
  // ROOMS
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Rooms"
  },
  // MOUNTAINS
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains"
  },
  // APARTMENTS
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Apartments"
  },
  // DESIGN
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Design"
  },
  // BEACHFRONT
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beachfront"
  },
  // AMAZING POOL
  {
    title: "Luxury Pool Villa",
    description: "Spend your days relaxing by an amazing infinity pool overlooking the ocean. This cozy villa is perfect for luxury seekers.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Bali",
    country: "Indonesia",
    category: "Amazing Pool"
  },
  // KITCHEN
  {
    title: "Chef's Dream House",
    description: "A fully equipped modern kitchen with premium appliances. Perfect for food lovers and cooking enthusiasts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Lyon",
    country: "France",
    category: "Kitchen"
  },
  // TRENDING
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Trending"
  },
  // MOUNTAINS
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains"
  },
  // APARTMENTS
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Apartments"
  },
  // ROOMS
  {
    title: "Japanese Ryokan Experience",
    description: "Experience authentic Japanese hospitality in this traditional ryokan with tatami rooms.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Kyoto",
    country: "Japan",
    category: "Rooms"
  },
  // DESIGN
  {
    title: "Modern Glass Pavilion",
    description: "A stunning glass pavilion designed by renowned architects. Perfect for those who love contemporary design.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaGFyY2l0ZWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Copenhagen",
    country: "Denmark",
    category: "Design"
  },
  // BEACHFRONT
  {
    title: "Tropical Island Bungalow",
    description: "A palm-thatched bungalow right on the white sand beach with crystal clear waters.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Maldives",
    country: "Maldives",
    category: "Beachfront"
  },
  // AMAZING POOL
  {
    title: "Resort Style Villa with Olympic Pool",
    description: "Resort-style living with an Olympic-size swimming pool and water features.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1428602953914-34cf0cb64d0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Miami",
    country: "United States",
    category: "Amazing Pool"
  },
  // KITCHEN
  {
    title: "Farm-to-Table Cottage with Organic Garden",
    description: "A rustic cottage with a fully stocked kitchen and access to fresh organic gardens.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521028065351-20bed32659d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2l0Y2hlbiUyMGdhcmRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Provence",
    country: "France",
    category: "Kitchen"
  },
  // TRENDING
  {
    title: "Desert Luxury Camp",
    description: "Experience luxury camping in the heart of the Sahara Desert with premium amenities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
    price: 2400,
    location: "Merzouga",
    country: "Morocco",
    category: "Trending"
  },
  // ROOMS
  {
    title: "Boutique Hotel Room in Barcelona",
    description: "A chic room in a boutique hotel in the heart of Barcelona's Gothic Quarter.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym91dGlxdWUlMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    price: 950,
    location: "Barcelona",
    country: "Spain",
    category: "Rooms"
  }
];

module.exports = sampleListings;
