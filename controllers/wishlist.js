const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

module.exports.toggleWishlist = async (req, res) => {
    const listingId = req.params.listingId;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        req.flash("error", "User not found!");
        return res.redirect("/listings");
    }

    const wishlist = user.wishlist || [];
    const index = wishlist.findIndex(id => id.toString() === listingId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(listingId);
    }

    user.wishlist = wishlist;
    await user.save();

    res.json({ 
        success: true, 
        isWishlisted: index === -1,
        count: wishlist.length 
    });
};

module.exports.getWishlist = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("wishlist");
    
    res.render("users/wishlist.ejs", { 
        wishlist: user.wishlist || [] 
    });
};