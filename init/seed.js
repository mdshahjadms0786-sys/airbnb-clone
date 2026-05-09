const mongoose = require("mongoose");
require("dotenv").config();

const { seedListingsIfNeeded } = require("./seedListings.js");

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function run() {
    try {
        await mongoose.connect(MONGO_URL);
        const result = await seedListingsIfNeeded();
        console.log(`Seed complete. seeded=${result.seeded} count=${result.count}`);
    } catch (error) {
        console.error("Seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close().catch(() => {});
    }
}

run();
