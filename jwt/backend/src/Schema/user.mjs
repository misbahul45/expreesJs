import { Schema, model } from "mongoose";
import { comparePassword, hashPassword } from "../util/hasing.mjs";
const userSchema=new Schema({
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
})

const signinSchema=new Schema({
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
})

userSchema.pre('save', 
    async function(next){
        try {
            this.password = hashPassword(this.password);
            next();
        } catch (error) {
            next(error);
        }
    }
)

userSchema.statics.login=async function(email, password){
    const user=await this.findOne({ email })
    if(user){
        const auth=comparePassword(password,user.password )
        if(auth){
            return user
        }
        return { message:"incorrect password" }
    }
    return{ message:"incorrect email" }
}
const User=model("Accounts", userSchema)

export default User
