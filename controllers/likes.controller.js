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
      err.failedApi = "게시글 좋아요 등록/취소";
      next(err);
    }
  };

  getLikedPosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const posts = await this.likesService.getLikedPosts(userId);

      res.status(200).json({ posts });
    } catch (err) {
      err.failedApi = "게시글 조회";
      next(err);
    }
  };
}

module.exports = LikesController;
