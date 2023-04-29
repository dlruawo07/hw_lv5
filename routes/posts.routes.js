const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const authMiddleware = require("../middlewares/auth-middleware");

const postsController = new PostsController();

router.get("/", postsController.getPosts);
router.post("/", authMiddleware, postsController.createPost);
router.get("/:postId", postsController.getOnePost);
router.put("/:postId", authMiddleware, postsController.updatePost);
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
