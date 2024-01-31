import mongoose from "mongoose"
import { Schema } from "mongoose"

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    body:{
        type:Array,
    }
})

const Post=mongoose.model('posts',postSchema)


export default Post
