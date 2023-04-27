const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller");

const commentsController = new CommentsController();

router.get("/:postId/comments", commentsController.getComments);
router.post("/:postId/comments", commentsController.createComment);
router.put("/:postId/comments/:commentId", commentsController.updateComment);
router.delete("/:postId/comments/:commentId", commentsController.deleteComment);

module.exports = router;
