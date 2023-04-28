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
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  };

  getLikedPosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const posts = await this.likesService.getLikedPosts(userId);

      res.status(200).json({ posts });
    } catch (err) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  };
}

module.exports = LikesController;
