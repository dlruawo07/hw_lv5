const { Likes, Posts } = require("../models");

const myError = require("../utils/error");

class LikesRepository {
  checkLike = async (userId, postId) => {
    const like = await Likes.findOne({ where: { userId, postId } }).catch(
      (err) => {
        throw myError(400, "게시글 좋아요에 실패했습니다.");
      }
    );
    return like;
  };

  likeOrUnlike = async (postId, userId, flag) => {
    if (!flag) {
      await Likes.create({ userId, postId }).catch((err) => {
        throw myError(400, "게시글 좋아요에 실패했습니다.");
      });
    } else {
      await Likes.destroy({ where: { userId, postId } }).catch((err) => {
        throw myError(400, "게시글 좋아요에 실패했습니다.");
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
