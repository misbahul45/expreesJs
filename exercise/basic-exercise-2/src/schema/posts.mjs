import mongoose from "mongoose"
import { Schema } from "mongoose"

const postSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true,
    },
    body:{
        type:Array,
    }
})

const Post=mongoose.model('posts',postSchema)


export default Post
