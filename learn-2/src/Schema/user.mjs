import { Schema, model } from "mongoose"

const userSchema=new Schema({
    username:{
        type:Schema.Types.String,
        require:true,
        unique:true,
    },
    email: Schema.Types.String,
    password:{
        type:Schema.Types.String,
        require:true,
    }
})


const User=model("User", userSchema)
export default User