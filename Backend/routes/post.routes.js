const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCotrller = require("../controllers/post.controllers");

router.get("/", postCotrller.getAllPosts); // Get all posts
router.get("/:id", postCotrller.getPost); // Get a post
router.post("/", auth, multer.single("post"), postCotrller.createPost); // Create a post
router.put("/update/:id", auth, multer.single("post"), postCotrller.updatePost); // Update a post
router.delete("/delete/:id", auth, postCotrller.deletePost); // Delete a post

router.patch("/like/:id", auth, postCotrller.likePost); // Like a post
router.patch("/unlike/:id", auth, postCotrller.unLikePost); // Unlike a post

router.patch("/comment/:id", auth, postCotrller.commentPost); // Comment a post
router.patch("/updateComment/:id", auth, postCotrller.updateComment); // Update a comment
router.patch("/deleteComment/:id", auth, postCotrller.deleteComment); // Delete a comment

module.exports = router;
