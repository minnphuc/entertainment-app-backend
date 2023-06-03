const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// API Endpoint

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.patch("/updateMe", authController.protect, userController.updateMe);

router.route("/:id").get(userController.getUserById);

module.exports = router;
