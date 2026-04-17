const Listing = require("../models/listing");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

const DEFAULT_IMAGE_URL = Listing.schema.path("image.url").defaultValue;
const DEFAULT_IMAGE_FILENAME = Listing.schema.path("image.filename").defaultValue;

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
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
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
    if(!req.body?.listing) {
        throw new ExpressError(400, 'Invalid Listing Data!');
    }
        const image = req.file
            ? {
                filename: req.file.filename,
                url: req.file.path,
            }
            : {
                filename: DEFAULT_IMAGE_FILENAME,
                url: getImageUrl(req.body.listing.image?.url),
            };
        const newListing = new Listing({
            ...req.body.listing,
            image,
        });
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect('/listings');
    
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
    const previewImageUrl = getPreviewImageUrl(listing.image.url);
    res.render('listings/edit.ejs', { listing, previewImageUrl });
};

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    if (!ensureValidListingId(id, req)) {
        return res.redirect("/listings");
    }
    if(!req.body?.listing) {
        throw new ExpressError(400, 'Invalid Listing Data!');
    }
    const { image, ...listingData } = req.body.listing;
    const updateData = { ...listingData };

    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    } else if (image?.url?.trim()) {
        updateData["image.url"] = getImageUrl(image.url);
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
