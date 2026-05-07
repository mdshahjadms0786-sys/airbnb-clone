const crypto = require('crypto');
const User = require("../models/user");

module.exports.renderForgotForm = (req, res) => {
    res.render("users/forgot-password.ejs");
};

module.exports.sendResetLink = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        req.flash("error", "No account found with that email address.");
        return res.redirect("/forgot-password");
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
    
    console.log(`
    ===============================================
    PASSWORD RESET REQUEST
    ===============================================
    Email: ${email}
    Reset Link: ${resetUrl}
    ===============================================
    NOTE: This is a demo. In production, send this via email!
    ===============================================
    `);
    
    req.flash("success", `Password reset link sent! (Check console for demo link)`);
    res.redirect("/login");
};

module.exports.renderResetForm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot-password");
    }
    
    res.render("users/reset-password.ejs", { token });
};

module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect(`/reset-password/${token}`);
    }
    
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot-password");
    }
    
    await user.setPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    req.flash("success", "Password has been reset. You can now login with your new password.");
    res.redirect("/login");
};