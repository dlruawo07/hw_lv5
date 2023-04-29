const myError = require("../utils/error");
const PostsRepository = require("../repositories/posts.repository");
const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  postsRepository = new PostsRepository();
  commentsRepository = new CommentsRepository();

  findAllComments = async (postId) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    const comments = await this.commentsRepository.findAllComments(postId);
    if (!comments.length) {
      throw myError(404, "댓글이 존재하지 않습니다.");
    }

    comments.sort((a, b) => b.createdAt - a.createdAt);

    return comments.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        nickname: comment.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (postId, userId, nickname, comment) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    await this.commentsRepository.createComment(
      postId,
      userId,
      nickname,
      comment
    );
  };

  updateComment = async (userId, postId, commentId, newComment) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    const comment = await this.commentsRepository.findOneComment(commentId);
    if (!comment) {
      throw myError(404, "댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw myError(403, "게시글 수정 권한이 존재하지 않습니다.");
    }

    await this.commentsRepository.updateComment(userId, commentId, newComment);
  };

  deleteComment = async (userId, postId, commentId) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    const comment = await this.commentsRepository.findOneComment(commentId);
    if (!comment) {
      throw myError(404, "댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw myError(403, "게시글 삭제 권한이 존재하지 않습니다.");
    }

    await this.commentsRepository.deleteComment(userId, commentId);
  };
}

module.exports = CommentsService;
