const express = require("express");
const { signup, verifyAccount, resendOtp, login, logout, forgetPassword, resetPassword, changePassword } = require("../controllers/authController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { getProfile, editProfile, suggestedUser, followUnfollow, getMe } = require("../controllers/userController");
const upload = require("../middleware/multer");

const router = express.Router();

//Auth routes
router.post("/signup", signup);
router.post("/verify", isAuthenticated, verifyAccount);
router.post("/resend-otp", isAuthenticated, resendOtp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", isAuthenticated, changePassword);

//User routes
router.get("/profile/:id", getProfile);
router.post("/edit-profile", isAuthenticated, upload.single("profilePicture"), editProfile);
router.get("/suggested-user", isAuthenticated, suggestedUser);
router.post("/follow-unfollow/:id", isAuthenticated, followUnfollow );
router.get("/me", isAuthenticated, getMe);

module.exports = router;
