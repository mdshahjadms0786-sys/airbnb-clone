const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    totalNights: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    cleaningFee: {
        type: Number,
        default: 0
    },
    serviceFee: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    guestName: {
        type: String,
        required: true
    },
    guestEmail: {
        type: String,
        required: true
    },
    guestPhone: {
        type: String,
        default: ''
    },
    specialRequests: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookingSchema.index({ user: 1 });
bookingSchema.index({ listing: 1 });
bookingSchema.index({ checkIn: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;