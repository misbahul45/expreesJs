import { Router } from "express";
import { userAuth } from "../validation/user.mjs";
import { matchedData, validationResult } from "express-validator";
import User from "../Schema/user.mjs";

const  authRouter=Router()

authRouter.post("/api/users/auth/create",
    async(req, res)=>{
        try{
            const validateErr=validationResult(req)
            const { body:data }=req
            const isFindUser=await User.find({ email:data.email })
            if(!validateErr.isEmpty()){
                return res.status(401).send({ error: validateErr.array() })
            }
            if(isFindUser){
                return res.send(401).send({ msg:"User already sign up" })
            }
            const newUser=new User(data)
            const createUser=await newUser.save()
            return res.status(200).send({ msg:"sucessfully Sign Up", user:createUser })
        }catch(e){
            return res.status(401).send({  msg:"invalid credentials" })
        }
    }
)

export default authRouter