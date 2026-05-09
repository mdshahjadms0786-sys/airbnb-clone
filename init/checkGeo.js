require('dotenv').config();
const mongoose = require('mongoose');
const { Listing } = require('../models/listing');

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGODB_URL || process.env.DB_URL;

async function checkGeometry() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB\n');
        
        const listings = await Listing.find({}).limit(5).select('title location geometry coordinates');
        
        console.log('Sample listings:');
        for (const listing of listings) {
            console.log(`\nTitle: ${listing.title}`);
            console.log(`Location: ${listing.location}`);
            console.log(`geometry:`, JSON.stringify(listing.geometry));
            console.log(`coordinates:`, listing.coordinates);
        }
        
        mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
        mongoose.disconnect();
    }
}

checkGeometry();