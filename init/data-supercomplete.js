const data = [];
const CATEGORIES = ['Trending', 'Rooms', 'Apartments', 'Mountains', 'Beachfront', 'Amazing Pool', 'Kitchen', 'Design', 'Favorites'];

const generateListingsPerCategory = (category, count = 12) => {
  const baseListings = {
    Trending: [
      {title: "Luxury Beachfront Villa", description: "Oceanfront paradise", price: 2500, location: "Miami Beach", country: "USA", rating: 4.8},
      {title: "City Penthouse Skyline", description: "Stunning city views", price: 3800, location: "Dubai", country: "UAE", rating: 4.9},
      {title: "Mountain Treehouse", description: "Eco-friendly retreat", price: 1200, location: "Big Sur", country: "USA", rating: 4.7},
      // ... more for 12
    ],
    // Add for all categories - abbreviated for brevity
  };

  // Generate 12 unique per category
  const listings = [];
  for(let i = 1; i <= count; i++) {
    listings.push({
      title: `${category} Luxury ${i}`,
      description: `Premium ${category.toLowerCase()} property #${i}. Perfect for your next trip.`,
      images: [
        {url: `https://images.unsplash.com/photo-${Math.floor(Math.random()*10000)}?w=800&q=60`, filename: `img${i}`},
        {url: `https://images.unsplash.com/photo-${Math.floor(Math.random()*10000)}?w=800&q=60`, filename: `img${i}-2`},
        {url: `https://images.unsplash.com/photo-${Math.floor(Math.random()*10000)}?w=800&q=60`, filename: `img${i}-3`},
        {url: `https://images.unsplash.com/photo-${Math.floor(Math.random()*10000)}?w=800&q=60`, filename: `img${i}-4`}
      ],
      price: 800 + Math.floor(Math.random() * 4200),
      location: `${category} City ${i}`,
      country: ['USA', 'Italy', 'France', 'Spain', 'Canada', 'Australia', 'Japan', 'Thailand'][Math.floor(Math.random()*8)],
      avgRating: (4.2 + Math.random()*0.7).toFixed(1),
      numReviews: Math.floor(Math.random()*150) + 10
    });
  }
  return listings;
};

CATEGORIES.forEach(cat => {
  data.push(...generateListingsPerCategory(cat, 12));
});

module.exports = { data };

