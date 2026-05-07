const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

require('dotenv').config();

const MONGO_URL = process.env.ATLASDB_URL;

main().then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        
        const hostNames = initData.hostNames || [];
        let hostNameIndex = 0;
        
        const mappedData = initData.data.map((obj) => {
            const imageObj = obj.image?.url ? { url: obj.image.url, filename: obj.image.filename || 'default' } : { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', filename: 'default' };
            const geometry = obj.geometry || { type: 'Point', coordinates: [0, 0] };
            const hostName = hostNames.length > 0 ? hostNames[hostNameIndex++ % hostNames.length] : "Wanderlust Host";
            return {
                ...obj,
                owner: '69d0e54dc08d1bfd335adf4c',
                image: imageObj,
                images: [imageObj],
                geometry: {
                    type: 'Point',
                    coordinates: geometry.coordinates || [0, 0]
                },
                coordinates: geometry.coordinates || [0, 0],
                hostName: hostName
            };
        });
        
        await Listing.insertMany(mappedData);
        console.log('Database initialized with sample data');
        console.log(`Inserted ${mappedData.length} listings`);
        
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

initDB();