const Listing = require("../models/listing");
const Review = require("../models/review");

const updateListingRating = async (listingId) => {
    const listing = await Listing.findById(listingId).populate('reviews');
    if (!listing || !listing.reviews || listing.reviews.length === 0) {
        await Listing.findByIdAndUpdate(listingId, {
            avgRating: 0,
            numReviews: 0
        });
        return;
    }

    const totalRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / listing.reviews.length;
    const numReviews = listing.reviews.length;

    await Listing.findByIdAndUpdate(listingId, {
        avgRating: Math.round(avgRating * 10) / 10,
        numReviews: numReviews
    });
};

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    await updateListingRating(listing._id);

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    await updateListingRating(id);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};


