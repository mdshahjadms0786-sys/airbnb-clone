const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

router.post("/:listingId/book", isLoggedIn, wrapAsync(bookingController.createBooking));

router.get("/my-bookings", isLoggedIn, wrapAsync(bookingController.getMyBookings));

router.get("/my-bookings/:id", isLoggedIn, wrapAsync(bookingController.getBookingDetails));

router.post("/my-bookings/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;