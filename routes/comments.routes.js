const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth-middleware");

const commentsController = new CommentsController();

router.get("/:postId/comments", commentsController.getComments);
router.post(
  "/:postId/comments",
  authMiddleware,
  commentsController.createComment
);
router.put(
  "/:postId/comments/:commentId",
  authMiddleware,
  commentsController.updateComment
);
router.delete(
  "/:postId/comments/:commentId",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
