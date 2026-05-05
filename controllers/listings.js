const Listing = require("../models/listing");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

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

// Updated for images array - backward compatible
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
    const { category } = req.query;
    let filter = {};
    
    if (category && CATEGORIES.includes(category)) {
        filter = { category };
    }
    
    const allListings = await Listing.find(filter);
    res.render('listings/index.ejs', { allListings, selectedCategory: category || null });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs', { categories: CATEGORIES });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render('listings/show.ejs', { listing });
};

module.exports.createListing = async (req, res, next) => {
    try {
        if(!req.body?.listing) {
            throw new ExpressError(400, 'Invalid Listing Data!');
        }

        let imageUrl = DEFAULT_IMAGE_URL;
        if (req.file) {
            imageUrl = req.file.path;
        } else if (req.body.listing.image?.url) {
            imageUrl = req.body.listing.image.url;
        } else if (req.body.listing.images?.[0]?.url) {
            imageUrl = req.body.listing.images[0].url;
        }

        const location = req.body.listing.location;
        const country = req.body.listing.country;
        let coordinates = [0, 0];
        let geometry = { type: 'point' };

        try {
            const searchQuery = `${location}, ${country}`;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`, {
                headers: { 'User-Agent': 'Wanderlust/1.0' }
            });
            const data = await response.json();
            if (data && data.length > 0) {
                coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
                geometry = {
                    type: 'point',
                    coordinates: coordinates
                };
            }
        } catch (geoErr) {
            console.warn('Geocoding failed, using default coordinates:', geoErr.message);
        }

        const newListing = new Listing({
            ...req.body.listing,
            image: {
                url: imageUrl,
                filename: req.file ? req.file.filename : DEFAULT_IMAGE_FILENAME
            },
            images: [{
                url: imageUrl,
                filename: req.file ? req.file.filename : DEFAULT_IMAGE_FILENAME
            }],
            geometry: geometry,
            coordinates: coordinates,
        });
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect('/listings');
    } catch (err) {
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
    const { images: imageInput, ...listingData } = req.body.listing;
    const updateData = { ...listingData, geometry: { type: 'point' } };

    if (req.body.listing.coordinates) {
        updateData.coordinates = req.body.listing.coordinates.split(',').map(Number);
    }

    if (req.file) {
        const newImage = {
            url: req.file.path,
            filename: req.file.filename,
        };
        updateData.image = newImage;
        updateData.images = [newImage];
    } else if (req.body.listing.image?.url) {
        updateData.image = {
            url: getImageUrl(req.body.listing.image.url),
            filename: req.body.listing.image.filename || DEFAULT_IMAGE_FILENAME
        };
        updateData.images = [{
            url: getImageUrl(req.body.listing.image.url),
            filename: req.body.listing.image.filename || DEFAULT_IMAGE_FILENAME
        }];
    }

    await Listing.findByIdAndUpdate(id, updateData, { runValidators: true });
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!")
    res.redirect('/listings');
};
