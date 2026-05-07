const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const CATEGORIES = [
    'Trending',
    'Rooms',
    'Apartments',
    'Mountains',
    'Beachfront',
    'Amazing Pool',
    'Kitchen',
    'Design',
    'Favorites'
];

const AMENITIES = [
    'WiFi',
    'AC',
    'Heating',
    'Kitchen',
    'Washer',
    'Dryer',
    'Parking',
    'Pool',
    'Gym',
    'TV',
    'Iron',
    'Hair Dryer',
    'Workspace',
    'Hot Water',
    'Dedicated Workspace',
    'Crib',
    'High Chair',
    'Smoke Alarm',
    'First Aid Kit',
    'Fire Extinguisher'
];

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    images: [{
        url: String,
        filename: String,
        _id: { type: Schema.Types.ObjectId, auto: true }
    }],
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        enum: CATEGORIES,
        default: 'Trending'
    },
    avgRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    hostName: {
        type: String,
        default: "Wanderlust Host"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point', 'point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    coordinates: {
        type: [Number],
        default: [0, 0]
    },
    amenities: [{
        type: String,
        enum: AMENITIES
    }],
    guests: {
        type: Number,
        default: 4
    },
    bedrooms: {
        type: Number,
        default: 1
    },
    beds: {
        type: Number,
        default: 1
    },
    bathrooms: {
        type: Number,
        default: 1
    },
    houseRules: {
        checkIn: { type: String, default: '3:00 PM' },
        checkOut: { type: String, default: '11:00 AM' },
        petsAllowed: { type: Boolean, default: false },
        smokingAllowed: { type: Boolean, default: false },
        eventsAllowed: { type: Boolean, default: false },
        additionalRules: { type: String, default: '' }
    }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
   if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
   }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = { Listing, CATEGORIES, AMENITIES };
