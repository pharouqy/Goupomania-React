const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCotrller = require("../controllers/user.controllers");

router.post("/signup", userCotrller.signup); // Create a new user
router.post("/signin", userCotrller.signin); // Sign in a user
router.get("/logout", userCotrller.logout); // Logout a user
router.get("/profils", userCotrller.getUsers); // Get all users
router.get("/profil/:id", userCotrller.getUser); // Get a user
router.put(
  "/update/:id",
  auth,
  multer.single("profil_image"),
  userCotrller.updateUser
); // Update a user
router.delete("/delete/:id", auth, userCotrller.deleteUser); // Delete a user

module.exports = router;
