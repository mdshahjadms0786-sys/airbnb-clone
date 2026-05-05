const data = [];

const CATEGORIES = ['Trending', 'Rooms', 'Apartments', 'Mountains', 'Beachfront', 'Amazing Pool', 'Kitchen', 'Design', 'Favorites'];

const countries = ['USA', 'Italy', 'France', 'Spain', 'Canada', 'Australia', 'Japan', 'Thailand', 'Mexico', 'UAE', 'UK', 'Germany'];

const getRandomUnsplash = () => `https://source.unsplash.com/800x600/?hotel,${Math.floor(Math.random()*100)}`;

CATEGORIES.forEach((category, catIndex) => {
  for(let i = 1; i <= 12; i++) {
    const rating = (4.2 + Math.random() * 0.7).toFixed(1);
    data.push({
      title: `${category} Luxury Stay #${i}`,
      description: `Amazing ${category.toLowerCase()} property in beautiful location. ${rating} stars from ${Math.floor(Math.random()*100 + 20)} reviews. Perfect for your Airbnb stay!`,
      images: [
        {url: getRandomUnsplash(), filename: `cat${catIndex}-${i}-1`},
        {url: getRandomUnsplash(), filename: `cat${catIndex}-${i}-2`},
        {url: getRandomUnsplash(), filename: `cat${catIndex}-${i}-3`},
        {url: getRandomUnsplash(), filename: `cat${catIndex}-${i}-4`},
        {url: getRandomUnsplash(), filename: `cat${catIndex}-${i}-5`}
      ],
      price: 850 + Math.floor(Math.random() * 4150),
      location: `${category} ${['City', 'Beach', 'Village', 'Resort'][Math.floor(Math.random()*4)]} ${i}`,
      country: countries[Math.floor(Math.random()*countries.length)],
      avgRating: Number(rating),
      numReviews: Math.floor(Math.random()*120) + 15
    });
  }
});

console.log(`Generated ${data.length} listings (${12} per category)`);

module.exports = { data };

