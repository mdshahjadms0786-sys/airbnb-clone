const { Listing, CATEGORIES, AMENITIES } = require("../models/listing");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=60";
const DEFAULT_IMAGE_FILENAME = "default-image";

const getImageUrl = (imageUrl) => {
    const trimmedImageUrl = imageUrl?.trim();
    return trimmedImageUrl || DEFAULT_IMAGE_URL;
};

const getPreviewImageUrl = (imageUrl) => {
    if (!imageUrl?.includes("/upload")) {
        return imageUrl;
    }
    return imageUrl.replace("/upload", "/upload/w_320,h_220,c_fill,q_auto,f_auto");
};

const ensureValidListingId = (id, req) => {
    if (!mongoose.isValidObjectId(id)) {
        req.flash("error", "Invalid listing id.");
        return false;
    }
    return true;
};

module.exports.index = async (req, res) => {
    const { category, page = 1, limit = 12, sort = 'newest' } = req.query;
    let filter = {};
    
    if (category && CATEGORIES.includes(category)) {
        if (category === 'Favorites' && req.user) {
            const User = require("../models/user");
            const user = await User.findById(req.user._id);
            filter = { _id: { $in: user.wishlist || [] } };
        } else {
            filter = { category };
        }
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    let sortOption = {};
    if (sort === 'price_low') sortOption = { price: 1 };
    else if (sort === 'price_high') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { avgRating: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else sortOption = { createdAt: -1 };
    
    const totalListings = await Listing.countDocuments(filter);
    const allListings = await Listing.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum);
    
    const totalPages = Math.ceil(totalListings / limitNum);
    
    let wishlistIds = [];
    if (req.user) {
        const User = require("../models/user");
        const user = await User.findById(req.user._id);
        wishlistIds = user.wishlist ? user.wishlist.map(id => id.toString()) : [];
    }
    
    res.render('listings/index.ejs', { 
        allListings: allListings || [], 
        selectedCategory: category || null,
        currentPage: pageNum,
        totalPages: totalPages || 1,
        totalListings: totalListings || 0,
        selectedSort: sort || 'newest',
        wishlistIds: wishlistIds || []
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs', { categories: CATEGORIES, amenities: AMENITIES });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render('listings/show.ejs', { listing, amenities: AMENITIES });
};

module.exports.createListing = async (req, res, next) => {
    try {
        if(!req.body?.listing) {
            throw new ExpressError(400, 'Invalid Listing Data!');
        }

        let images = [];
        
        if (req.files && req.files.length > 0) {
            console.log('Files received:', req.files.length);
            images = req.files.map(file => ({
                url: file.path || file.secure_url,
                filename: file.filename || file.public_id
            }));
        }
        
        if (images.length === 0) {
            images = [{
                url: DEFAULT_IMAGE_URL,
                filename: DEFAULT_IMAGE_FILENAME
            }];
        }
        
        const mainImage = images[0];

        const location = req.body.listing.location;
        const country = req.body.listing.country;
        let coordinates = [0, 0];
        let geometry = { type: 'Point', coordinates: [0, 0] };

        try {
            const searchQuery = `${location}, ${country}`;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`, {
                headers: { 'User-Agent': 'Wanderlust/1.0' }
            });
            const data = await response.json();
            if (data && data.length > 0) {
                coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
                geometry = {
                    type: 'Point',
                    coordinates: coordinates
                };
            }
        } catch (geoErr) {
            console.warn('Geocoding failed, using default coordinates');
        }

        const newListing = new Listing({
            title: req.body.listing.title,
            description: req.body.listing.description,
            price: req.body.listing.price,
            location: req.body.listing.location,
            country: req.body.listing.country,
            category: req.body.listing.category,
            image: {
                url: mainImage.url,
                filename: mainImage.filename
            },
            images: images,
            geometry: geometry,
            coordinates: coordinates,
            amenities: req.body.listing.amenities || [],
            guests: parseInt(req.body.listing.guests) || 4,
            bedrooms: parseInt(req.body.listing.bedrooms) || 1,
            beds: parseInt(req.body.listing.beds) || 1,
            bathrooms: parseInt(req.body.listing.bathrooms) || 1,
            houseRules: {
                checkIn: req.body.listing['houseRules.checkIn'] || '3:00 PM',
                checkOut: req.body.listing['houseRules.checkOut'] || '11:00 AM',
                petsAllowed: req.body.listing['houseRules.petsAllowed'] === 'true' || false,
                smokingAllowed: req.body.listing['houseRules.smokingAllowed'] === 'true' || false,
                eventsAllowed: req.body.listing['houseRules.eventsAllowed'] === 'true' || false,
                additionalRules: req.body.listing['houseRules.additionalRules'] || ''
            }
        });
        newListing.owner = req.user._id;
        newListing.hostName = req.user.username;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect('/listings');
    } catch (err) {
        console.error('Create listing error:', err);
        next(err);
    }
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    const previewImageUrl = getPreviewImageUrl(listing.images?.[0]?.url || listing.image?.url);
    const coordinates = listing.coordinates ? listing.coordinates.join(',') : '';
    res.render('listings/edit.ejs', { listing, previewImageUrl, coordinates, categories: CATEGORIES });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    if(!req.body?.listing) {
        throw new ExpressError(400, 'Invalid Listing Data!');
    }
    
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    
    let images = listing.images || [];
    
    if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }));
        images = newImages;
    } else if (req.body.listing.keepImages === 'true' || req.body.listing.keepImages === true) {
    } else if (req.body.listing.images && Array.isArray(req.body.listing.images)) {
        images = req.body.listing.images.filter(img => img && img.url).map(img => ({
            url: img.url,
            filename: img.filename || 'existing-image'
        }));
    }
    
    if (images.length === 0) {
        images = [{
            url: DEFAULT_IMAGE_URL,
            filename: DEFAULT_IMAGE_FILENAME
        }];
    }
    
    const mainImage = images[0];
    
    const updateData = {
        ...req.body.listing,
        image: {
            url: mainImage.url,
            filename: mainImage.filename
        },
        images: images,
        geometry: { type: 'Point' }
    };

    if (req.body.listing.coordinates) {
        const coords = req.body.listing.coordinates.split(',').map(Number);
        updateData.coordinates = coords;
        updateData.geometry.coordinates = coords;
    }

    await Listing.findByIdAndUpdate(id, updateData, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings');
};
