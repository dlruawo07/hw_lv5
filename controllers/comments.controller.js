const CommentsService = require("../services/comments.service");

const myError = require("../utils/error");

class CommentsController {
  commentsService = new CommentsService();

  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentsService.findAllComments(postId);

      res.status(200).json({ comments });
    } catch (err) {
      err.failedApi = "댓글 조회";
      next(err);
    }
  };

  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { comment } = req.body;

      if (!comment || comment === "") {
        throw myError(412, "데이터 형식이 올바르지 않습니다.");
      }

      await this.commentsService.createComment(
        postId,
        userId,
        nickname,
        comment
      );

      res.status(201).json({ message: "댓글을 작성했습니다." });
    } catch (err) {
      err.failedApi = "댓글 작성";
      next(err);
    }
  };

  updateComment = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length !== 1) {
        throw myError(412, "데이터 형식이 올바르지 않습니다.");
      }

      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body;

      if (!comment || comment == "") {
        throw myError(412, "댓글 내용의 형식이 일치하지 않습니다.");
      }

      await this.commentsService.updateComment(
        userId,
        postId,
        commentId,
        comment
      );

      res.status(200).json({ message: "댓글을 수정했습니다." });
    } catch (err) {
      err.failedApi = "댓글 수정";
      next(err);
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;

      await this.commentsService.deleteComment(userId, postId, commentId);

      res.status(200).json({ message: "댓글을 삭제했습니다." });
    } catch (err) {
      err.failedApi = "댓글 삭제";
      next(err);
    }
  };
}

module.exports = CommentsController;
