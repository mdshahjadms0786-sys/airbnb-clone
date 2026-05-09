const Booking = require('../models/booking');
const { Listing } = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

module.exports.createBooking = async (req, res, next) => {
    try {
        const listingId = req.params.listingId;
        const { checkIn, checkOut, guests, pricePerNight, cleaningFee, serviceFee, totalPrice, totalNights } = req.body;
        
        console.log('Booking request:', { listingId, checkIn, checkOut, guests });
        
        if (!listingId || !checkIn || !checkOut || !guests) {
            throw new ExpressError(400, 'Please provide all required fields');
        }

        const listing = await Listing.findById(listingId);
        if (!listing) {
            throw new ExpressError(404, 'Listing not found');
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate >= checkOutDate) {
            throw new ExpressError(400, 'Check-out date must be after check-in date');
        }

        const newBooking = new Booking({
            user: req.user._id,
            listing: listingId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: parseInt(guests),
            totalNights: parseInt(totalNights) || 1,
            pricePerNight: parseFloat(pricePerNight) || 0,
            cleaningFee: parseFloat(cleaningFee) || 0,
            serviceFee: parseFloat(serviceFee) || 0,
            totalPrice: parseFloat(totalPrice) || 0,
            guestName: req.user.username,
            guestEmail: req.user.email,
            status: 'confirmed'
        });

        await newBooking.save();

        req.flash('success', 'Booking confirmed successfully!');
        res.redirect('/bookings/my-bookings');
    } catch (err) {
        next(err);
    }
};

module.exports.cancelBooking = async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
        req.flash('error', 'Booking not found');
        return res.redirect('/bookings/my-bookings');
    }

    if (!booking.user.equals(req.user._id)) {
        req.flash('error', 'You are not authorized');
        return res.redirect('/bookings/my-bookings');
    }

    if (booking.status === 'cancelled') {
        req.flash('error', 'Booking already cancelled');
        return res.redirect('/bookings/my-bookings');
    }

    booking.status = 'cancelled';
    await booking.save();

    req.flash('success', 'Booking cancelled successfully');
    res.redirect('/bookings/my-bookings');
};

module.exports.getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });
    
    const pastBookings = [];
    const upcomingBookings = [];
    const now = new Date();
    
    bookings.forEach(booking => {
        if (booking.checkOut < now) {
            pastBookings.push(booking);
        } else {
            upcomingBookings.push(booking);
        }
    });
    
    res.render('bookings/index.ejs', { upcomingBookings, pastBookings });
};

module.exports.getBookingDetails = async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate('listing')
        .populate('user');
    
    if (!booking) {
        req.flash('error', 'Booking not found');
        return res.redirect('/bookings/my-bookings');
    }

    if (!booking.user._id.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to view this booking');
        return res.redirect('/bookings/my-bookings');
    }

    res.render('bookings/show.ejs', { booking });
};