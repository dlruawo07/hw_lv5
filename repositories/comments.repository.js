const myError = require("../utils/error");
const { Comments } = require("../models");

class CommentsRepository {
  findAllComments = async (postId) => {
    const comments = await Comments.findAll({ where: { postId } }).catch(
      (err) => {
        throw new Error();
      }
    );

    return comments;
  };

  createComment = async (postId, userId, nickname, comment) => {
    await Comments.create({
      postId,
      userId,
      nickname,
      comment,
    }).catch((err) => {
      throw new Error();
    });
  };

  findOneComment = async (commentId) => {
    const comment = await Comments.findOne({ where: { commentId } }).catch(
      (err) => {
        throw new Error();
      }
    );

    return comment;
  };

  updateComment = async (userId, commentId, comment) => {
    await Comments.update(
      { comment, updatedAt: new Date() },
      { where: { userId, commentId } }
    ).catch((err) => {
      throw myError(401, "댓글이 정상적으로 수정되지 않았습니다.");
    });
  };

  deleteComment = async (userId, commentId) => {
    await Comments.destroy({ where: { userId, commentId } }).catch((err) => {
      throw myError(401, "댓글이 정상적으로 삭제되지 않았습니다.");
    });
  };
}

module.exports = CommentsRepository;
