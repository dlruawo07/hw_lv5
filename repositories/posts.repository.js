const myError = require("../utils/error");
const { Posts } = require("../models");

class PostsRepository {
  findAllPosts = async () => {
    const posts = await Posts.findAll().catch((err) => {
      throw new Error();
    });

    return posts;
  };

  createPost = async (userId, nickname, title, content) => {
    await Posts.create({
      userId,
      nickname,
      title,
      content,
    }).catch((err) => {
      throw new Error();
    });
  };

  findOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } }).catch((err) => {
      throw new Error();
    });

    return post;
  };

  updatePost = async (userId, postId, title, content) => {
    await Posts.update(
      { title, content, updatedAt: new Date() },
      { where: { userId, postId } }
    ).catch((err) => {
      throw myError(401, "게시글이 정상적으로 수정되지 않았습니다.");
    });
  };

  deletePost = async (userId, postId) => {
    await Posts.destroy({ where: { userId, postId } }).catch((err) => {
      throw myError(401, "게시글이 정상적으로 삭제되지 않았습니다.");
    });
  };

  likeOrUnlikePost = async (postId, flag) => {
    const post = await Posts.findOne({ where: { postId } }).catch((err) => {
      throw new Error();
    });

    if (!flag) {
      await post.increment("likes", { by: 1 }).catch((err) => {
        throw new Error();
      });
    } else {
      await post.decrement("likes", { by: 1 }).catch((err) => {
        throw new Error();
      });
    }
  };
}

module.exports = PostsRepository;
