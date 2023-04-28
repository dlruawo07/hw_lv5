const PostsRepository = require("../repositories/posts.repository");
const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  postsRepository = new PostsRepository();
  likesRepository = new LikesRepository();

  likeOrUnlike = async (userId, postId) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    const isLiked = await this.likesRepository.checkLike(userId, postId);

    await this.likesRepository.likeOrUnlike(postId, userId, isLiked);
    await this.postsRepository.likeOrUnlikePost(postId, isLiked);
    return !isLiked
      ? "게시글에 좋아요를 등록했습니다."
      : "게시글의 좋아요를 취소했습니다.";
  };

  getLikedPosts = async (userId) => {
    const posts = await this.likesRepository.getLikedPosts(userId);
    if (!posts.length) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    posts.sort((a, b) => b.createdAt - a.createdAt);

    return posts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };
}

module.exports = LikesService;
