const PostsService = require("../services/posts.service");

const myError = require("../utils/error");

class PostsController {
  postsService = new PostsService();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      res.status(200).json({ posts });
    } catch (err) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;

      await this.postsService.createPost(userId, nickname, title, content);

      res.status(201).json({ message: "게시글을 작성했습니다." });
    } catch (err) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  };

  getOnePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await this.postsService.findOnePost(postId);

      res.status(200).json({ post });
    } catch (err) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length !== 2) {
        throw myError(412, "데이터 형식이 올바르지 않습니다.");
      }

      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      if (!title || title == "") {
        throw myError(412, "게시글 제목의 형식이 일치하지 않습니다.");
      }

      if (!content || content == "") {
        throw myError(412, "게시글 내용의 형식이 일치하지 않습니다.");
      }

      await this.postsService.updatePost(userId, postId, title, content);

      res.status(200).json({ message: "게시글을 수정했습니다." });
    } catch (err) {
      if (!err.statusCode) {
        res.status(400).json({ errorMessage: "게시글 수정에 실패했습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      await this.postsService.deletePost(userId, postId);

      res.status(200).json({ message: "게시글을 삭제했습니다." });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        res.status(400).json({ errorMessage: "게시글 삭제에 실패했습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
    }
  };
}

module.exports = PostsController;
