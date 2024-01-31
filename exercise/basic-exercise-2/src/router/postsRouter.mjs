import { Router } from "express";
import { validationResult, matchedData } from "express-validator";
import Post from "../schema/posts.mjs";
import { body_validation, param_validation, query_validation } from "../validation/postValidation.mjs";

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
    console.log(req.session)
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

postsRouter.post("/api/posts",
    body_validation(),
    async(req, res)=>{
        try{
            const errorResult=validationResult(req)
            if(!errorResult.isEmpty()){
                return res.status(401).send({ error:errorResult.array() })
            }
            const data=matchedData(req)
            const post=new Post({
                ...data
            })
            const savedPost=await post.save() 
            if (!savedPost) {
                throw new Error("Failed to save post");
            }
            return res.status(200).send({msg:"successfully save", post:savedPost})
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    }
)


postsRouter.patch("/api/posts/:id",
    param_validation(),
    async(req,res)=>{
      try{
        const errorResult=validationResult(req)
        if(!errorResult.isEmpty()){
          throw new Error("invalid id")
        }
        const { id }=matchedData(req)
        const  { body:dataEdit }=req
        const editPost=await Post.findByIdAndUpdate(id, dataEdit, { new:true })
        return res.status(200).send({ msg :"succesfully edit" , post:editPost })
      }catch(e){
      return res.status(401).send({ msg:e.message })
    }
  }
)

postsRouter.delete("/api/posts/:id",
  param_validation(),
  async(req,res)=>{
    try{
      const errorResult=validationResult(req)
      if(!errorResult.isEmpty()){
        throw new Error("invalid id")
      }
      const { id }=matchedData(req)
      await Post.findByIdAndDelete(id)
      return res.status(200).send({ msg :"succesfully delete" })
    }catch(e){
      return res.status(401).send({ msg:e.message })
    }
  }
)


export default postsRouter;
