const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  like = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const message = await this.likesService.likeOrUnlike(userId, postId);

      res.status(200).json({ message });
    } catch (err) {
      if (!err.statusCode) {
        res
          .status(400)
          .json({ errorMessage: "게시글 좋아요 등록에 실패했습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
    }
  };

  getLikedPosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const posts = await this.likesService.getLikedPosts(userId);

      res.status(200).json({ posts });
    } catch (err) {
      if (!err.statusCode) {
        res.status(400).json({ errorMessage: "게시글 조회에 실패했습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
    }
  };
}

module.exports = LikesController;
