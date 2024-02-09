import { Schema, model } from "mongoose";
const signup=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, 
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})

const Signup=model("Accounts",signup)
export default Signup