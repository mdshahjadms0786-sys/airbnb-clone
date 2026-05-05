const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Category options
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

// Listing schema with geometry support for mapping
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String,
    },
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
    geometry: {
        type: {
            type: String,
            enum: ['point'],
            required: true
        }
    },
    coordinates: {
        type: [Number],
        default: [0, 0]
    }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
   if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
   }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
