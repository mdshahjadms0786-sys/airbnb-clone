const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const wishlistController = require("../controllers/wishlist");
const { isLoggedIn } = require("../middleware");

router.post("/:listingId", isLoggedIn, wrapAsync(wishlistController.toggleWishlist));
router.get("/", isLoggedIn, wrapAsync(wishlistController.getWishlist));

module.exports = router;