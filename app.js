if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// DB URL
const dbUrl = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// MongoDB Connect with Retry Logic
let dbConnected = false;
const connectDB = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(dbUrl, {
                serverSelectionTimeoutMS: 5000,
            });
            dbConnected = true;
            console.log("✅ Connected to MongoDB");
            break;
        } catch (err) {
            console.log(`⚠️  MongoDB Connection Attempt ${i + 1}/${retries} failed.`);
            console.log(`   Error: ${err.message.substring(0, 100)}...`);
            if (i === retries - 1) {
                console.log("❌ MongoDB not available. Running in limited mode...");
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
};

connectDB();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session Config
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + current user
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ✅ FIXED 404 handler (no "*" error)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    
    // Handle MongoDB connection timeouts
    if (err.message && err.message.includes("buffering timed out")) {
        statusCode = 503;
        message = "Database is currently unavailable. Please try again later.";
    }
    
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error: " + Object.values(err.errors).map(e => e.message).join(", ");
    }
    
    // Handle Mongoose cast errors
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }
    
    console.error("❌ Error:", err);
    res.status(statusCode).render("listings/error.ejs", { error: { statusCode, message } });
});

// Server Start
app.listen(8080, () => {
    console.log("🚀 Server running on http://localhost:8080");
});