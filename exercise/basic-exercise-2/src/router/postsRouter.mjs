import { Router } from "express";
import { matchedData } from "express-validator";
import Post from "../schema/posts.mjs";
import { param_validation, query_validation } from "../validation/postValidation.mjs";

const postsRouter = Router();

postsRouter.get(
  "/api/posts/:id?",
  param_validation(),
  async (req, res, next) => {
    try {
      const { id } = matchedData(req);

      if (id) {
        const findPost = await Post.find({ _id: id });

        if (findPost.length === 0) {
          throw new Error("Post not found");
        }

        return res.status(200).send(findPost);
      }

      next();
    } catch (err) {
      return res.status(401).send({ error: err.message });
    }
  },
  query_validation(),
  async (req, res) => {
    try {
      const { limit, title, author } = matchedData(req);

      const query = {};

      if (title) {
        query.title = { $regex: title, $options: "i" }; 
      }

      if (author) {
        query.author = { $regex: author, $options: "i" }; 
      }

      const posts = await Post.find(query).limit(Number(limit));

      return res.status(200).send(posts);
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }
);

export default postsRouter;
