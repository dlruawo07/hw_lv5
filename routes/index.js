const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const commentsRouter = require("./comments.routes");
const likesRouter = require("./likes.routes");

router.use("/", [usersRouter]);
router.use("/posts", [likesRouter, commentsRouter, postsRouter]);

router.get("/", async (req, res) => {
  return res.send("This is an api index page");
});

module.exports = router;
