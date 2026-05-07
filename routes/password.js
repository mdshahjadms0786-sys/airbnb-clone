const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passwordController = require("../controllers/password");

router.get("/forgot-password", passwordController.renderForgotForm);

router.post("/forgot-password", wrapAsync(passwordController.sendResetLink));

router.get("/reset-password/:token", wrapAsync(passwordController.renderResetForm));

router.post("/reset-password/:token", wrapAsync(passwordController.resetPassword));

module.exports = router;