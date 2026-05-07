const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudeConfig.js");
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.get("/", wrapAsync(listingController.index));
router.get('/new', isLoggedIn, listingController.renderNewForm);
router.post("/", isLoggedIn, upload.array("listing[images]", 5), validateListing, wrapAsync(listingController.createListing));

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.put('/:id', isLoggedIn, isOwner, upload.array("listing[images]", 5), validateListing, wrapAsync(listingController.updateListing));
router.get('/:id', wrapAsync(listingController.showListing));
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
