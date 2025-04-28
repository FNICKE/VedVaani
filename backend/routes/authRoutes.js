const express = require("express");
const { registerController, loginController, logoutController } = require("../controller/authController");

const router = express.Router();

// Routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
