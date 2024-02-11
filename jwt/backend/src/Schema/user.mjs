import { Schema, model } from "mongoose";
import { hashPassword } from "../util/hasing.mjs";
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
})

signup.pre('save', 
    async function(next){
        try {
            this.password = await hashPassword(this.password);
            next();
        } catch (error) {
            next(error);
        }
    }
)

const Signup=model("Accounts",signup)
export default Signup