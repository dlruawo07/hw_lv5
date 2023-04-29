const { Likes, Posts } = require("../models");

class LikesRepository {
  checkLike = async (userId, postId) => {
    const like = await Likes.findOne({ where: { userId, postId } }).catch(
      (err) => {
        throw new Error();
      }
    );

    return like;
  };

  likeOrUnlike = async (postId, userId, flag) => {
    if (!flag) {
      await Likes.create({ userId, postId }).catch((err) => {
        throw new Error();
      });
    } else {
      await Likes.destroy({ where: { userId, postId } }).catch((err) => {
        throw new Error();
      });
    }
  };

  getLikedPosts = async (userId) => {
    const posts = await Likes.findAll({
      include: [{ model: Posts, required: true }],
      where: { userId },
    });

    return posts;
  };
}

module.exports = LikesRepository;
