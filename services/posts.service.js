const myError = require("../utils/error");
const PostsRepository = require("../repositories/posts.repository");

class PostsService {
  postsRepository = new PostsRepository();

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();
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

  createPost = async (userId, nickname, title, content) => {
    await this.postsRepository.createPost(userId, nickname, title, content);
  };

  findOnePost = async (postId) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    return {
      postId: post.postId,
      userId: post.userId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  updatePost = async (userId, postId, title, content) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    if (userId !== post.userId) {
      throw myError(403, "게시글 수정 권한이 존재하지 않습니다.");
    }

    await this.postsRepository.updatePost(userId, postId, title, content);
  };

  deletePost = async (userId, postId) => {
    const post = await this.postsRepository.findOnePost(postId);
    if (!post) {
      throw myError(404, "게시글이 존재하지 않습니다.");
    }

    if (userId !== post.userId) {
      throw myError(403, "게시글 삭제 권한이 존재하지 않습니다.");
    }

    await this.postsRepository.deletePost(userId, postId);
  };
}

module.exports = PostsService;
