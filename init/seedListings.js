const initData = require("./data.js");
const { Listing } = require("../models/listing.js");

const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800";

function buildSeedListings() {
    const hostNames = initData.hostNames || [];

    return (initData.data || []).map((item, index) => {
        const primaryImage = {
            url: item.image?.url || FALLBACK_IMAGE_URL,
            filename: item.image?.filename || `seed-image-${index + 1}`,
        };

        return {
            title: item.title,
            description: item.description,
            image: primaryImage,
            images: [primaryImage],
            price: item.price,
            location: item.location,
            country: item.country,
            category: item.category || "Trending",
            avgRating: item.avgRating || 0,
            numReviews: item.numReviews || 0,
            geometry: {
                type: "Point",
                coordinates: item.geometry?.coordinates || [0, 0],
            },
            coordinates: item.geometry?.coordinates || [0, 0],
            hostName: item.hostName || hostNames[index % hostNames.length] || "Wanderlust Host",
            amenities: item.amenities || [],
            guests: item.guests || 4,
            bedrooms: item.bedrooms || 1,
            beds: item.beds || 1,
            bathrooms: item.bathrooms || 1,
            houseRules: {
                checkIn: item.houseRules?.checkIn || "3:00 PM",
                checkOut: item.houseRules?.checkOut || "11:00 AM",
                petsAllowed: item.houseRules?.petsAllowed || false,
                smokingAllowed: item.houseRules?.smokingAllowed || false,
                eventsAllowed: item.houseRules?.eventsAllowed || false,
                additionalRules: item.houseRules?.additionalRules || "",
            },
        };
    });
}

async function seedListingsIfNeeded() {
    const existingCount = await Listing.countDocuments({});
    if (existingCount > 0) {
        return { seeded: false, count: existingCount };
    }

    const listings = buildSeedListings();
    if (listings.length === 0) {
        return { seeded: false, count: 0 };
    }

    await Listing.insertMany(listings);
    return { seeded: true, count: listings.length };
}

async function resetAndSeedListings() {
    await Listing.deleteMany({});
    const listings = buildSeedListings();
    await Listing.insertMany(listings);
    return { seeded: true, count: listings.length };
}

module.exports = {
    buildSeedListings,
    seedListingsIfNeeded,
    resetAndSeedListings,
};
