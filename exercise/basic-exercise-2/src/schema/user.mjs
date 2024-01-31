import { Schema, model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:Schema.Types.String,
        required:true,
    },
    email:{
        type:Schema.Types.String,
        required:true,
    },
    password:{
        type:Schema.Types.String,
        required:true,
    }
})

const User=model("users", userSchema)

export default User
