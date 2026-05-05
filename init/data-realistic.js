const data = [];

const CATEGORIES = {
  Trending: ['Oceanfront Penthouse Miami', 'Downtown Loft NYC', 'Treehouse Big Sur', 'Glamping Morocco', 'Yacht Dubai', 'Sky Villa Singapore', 'Ice Hotel Sweden', 'Cave House Spain', 'Floating House Amsterdam', 'Bubble Hotel France', 'Sauna Finland', 'Helicopter Pad Monaco'],
  Rooms: ['Cozy Room Paris Attic', 'Modern Loft Room Barcelona', 'Traditional Ryokan Kyoto', 'Boutique Room Santorini', 'Castle Room Scotland', 'Beach Hut Bali', 'Mountain Lodge Room Aspen', 'Urban Room Tokyo Capsule', 'Hostel Private Prague', 'Farm Stay Room Tuscany', 'Ski Chalet Room Alps', 'Tree Room Costa Rica'],
  Apartments: ['Tuscan Villa Florence', 'Amsterdam Canal House', 'London Thames View', 'Berlin Industrial Loft', 'Tokyo Micro Apartment', 'Paris Haussmann Apartment', 'Madrid Historic Flat', 'Lisbon Ocean View', 'Vienna Art Nouveau', 'Budapest Thermal Bath View', 'Stockholm Fika Apartment', 'Copenhagen Hygge Flat'],
  Mountains: ['Aspen Ski Cabin', 'Swiss Chalet Verbier', 'Banff Lake Cabin', 'Dolomites Hut Cortina', 'Queenstown Alpine Lodge', 'Patagonia Refugio', 'Himalaya Teahouse Nepal', 'Rocky Mountain Cabin Colorado', 'Pyrenees Chalet Spain', 'Scottish Highlands Bothy', 'Canadian Rockies Log Cabin', 'New Zealand Fiord Lodge'],
  Beachfront: ['Cancun Beach Condo', 'Maldives Overwater Bungalow', 'Santorini Cliff Villa', 'Bali Seminyak Villa', 'Maui Oceanfront Cottage', 'Phuket Private Beach', 'Barbados Rum Shack', 'Croatia Island Villa', 'Sri Lanka Surf House', 'Zanzibar Spice Beach', 'Nosy Be Madagascar', 'Bora Bora Overwater'],
  'Amazing Pool': ['Bali Infinity Pool', 'Miami Olympic Villa', 'Ibiza Cliffside Pool', 'Cape Town Rooftop Pool', 'Thailand Jungle Pool', 'Mykonos Infinity Edge', 'Mexico Cenote Villa', 'Portugal Cliff Pool', 'California Desert Pool', 'Vietnam Rice Terrace Pool', 'Morocco Riad Pool', 'Australia Outback Pool'],
  Kitchen: ['Lyon Chef Kitchen', 'Provence Organic Farm', 'Sicily Pasta Villa', 'Mexico Taco Hacienda', 'Smoky Mountains BBQ Cabin', 'Japanese Sushi Loft', 'Indian Spice Kitchen Goa', 'Turkish Meze Istanbul', 'Greek Cooking Island', 'Peruvian Ceviche Lima', 'Thai Street Food Bangkok', 'Italian Pizza Napples'],
  Design: ['Portland Treehouse', 'Copenhagen Glass Pavilion', 'Joshua Tree Dome', 'Cape Town Container', 'Taos Earthship', 'Dutch Cube House', 'Barcelona Gaudi Inspired', 'Frank Lloyd Wright Cabin', 'Bubble House France', 'A Frame Alaska', 'Yurt Mongolia Style', 'Sauna Finland Modern'],
  Favorites: ['Cotswolds Cottage UK', 'Lake Como Villa', 'Amalfi Cliff House', 'Skye Castle Scotland', 'Lake Louise Cabin', 'Hallstatt Lake Austria', 'Santorini Caldera Suite', 'Matera Cave Hotel', 'Faroe Islands Cottage', 'Slovenia Lake Bled', 'Iceland Hot Spring Villa', 'Patagonia Glamping']
};

Object.entries(CATEGORIES).forEach(([category, titles]) => {
  titles.forEach((title, index) => {
    const rating = Number((4.3 + Math.random() * 0.6).toFixed(1));
    const locationSuffix = title.includes('City') ? title.match(/(.+?) City/)?.[1] || category : title.split(' ').pop();
    data.push({
      title,
      description: `Exceptional ${category.toLowerCase()} stay. ${rating}★ (${Math.floor(Math.random()*80 + 25)} reviews). ${title} offers luxury comfort and unique design.`,
      images: Array.from({length: 5}, (_, i) => ({
        url: `https://source.unsplash.com/800x600/?${encodeURIComponent(title.toLowerCase().replace(/[^a-z]/g,''))},${i+1}`,
        filename: `${category.toLowerCase()}-${title.toLowerCase().replace(/[^a-z]/g,'')}-${i+1}`
      })),
      price: 900 + Math.floor(Math.random() * 4100),
      location: `${locationSuffix}, ${['Beach', 'Downtown', 'Village', 'Resort', 'Mountain'][Math.floor(Math.random()*5)]}`,
      country: title.includes('USA') || title.includes('NYC') || title.includes('Miami') ? 'USA' :
               title.includes('UK') || title.includes('London') ? 'UK' :
               title.includes('Paris') ? 'France' :
               title.includes('Tokyo') ? 'Japan' :
               ['Italy', 'Spain', 'Canada', 'Australia', 'Thailand', 'Mexico'][Math.floor(Math.random()*6)],
      avgRating: rating,
      numReviews: Math.floor(Math.random()*100 + 25)
    });
  });
  
  // Fill to 12 if less
  while(data.filter(l => l.category === category).length < 12) {
    const extraIndex = data.filter(l => l.category === category).length + 1;
    data.push({
      title: `${category} Premium Stay #${extraIndex}`,
      description: `Luxury ${category.toLowerCase()} accommodation with stunning views and amenities.`,
      images: Array.from({length: 5}, (_, i) => ({
        url: `https://source.unsplash.com/800x600/?${category.toLowerCase()},luxury,${i+1}`,
        filename: `${category.toLowerCase()}-premium-${extraIndex}-${i+1}`
      })),
      price: 1200 + Math.floor(Math.random() * 3000),
      location: `${category} Resort ${extraIndex}`,
      country: ['USA', 'Italy', 'France', 'Greece'][Math.floor(Math.random()*4)],
      avgRating: Number((4.4 + Math.random() * 0.5).toFixed(1)),
      numReviews: Math.floor(Math.random()*75 + 30)
    });
  }
});

module.exports = { data };

