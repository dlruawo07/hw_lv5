const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const authMiddleware = require("../middlewares/auth-middleware");

const likesController = new LikesController();

router.put("/:postId/like", authMiddleware, likesController.like);
router.get("/like", authMiddleware, likesController.getLikedPosts);

module.exports = router;
