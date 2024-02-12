import { Router } from "express";
import { signUpValidator } from "../validator/auth.mjs";
import { matchedData, validationResult } from "express-validator";
import Signup from "../Schema/user.mjs";
import { createToken, maxAge } from "../util/token.mjs";

const auth=Router()

auth.post("/auth/signup",
    signUpValidator(),
    async (req,res)=>{
        const isError=validationResult(req)
        if(!isError.isEmpty()){
            return res.status(500).send({ message:isError.array() })
        }
        const data=matchedData(req)

        try{
            const existingUser =await Signup.findOne({email:data.email})
           if (existingUser) {
              return res.status(400).json({ message: "Email already exists" });
            }      
            const newUser=new Signup(data)
            await newUser.save()
            const token=createToken(newUser._id)
            if(!newUser){
                throw new Error("invalid credentials")
            }
            res.setHeader('Content-Type', 'application/json');
            res.cookie('user_sign_in', token, { httpOnly: true, maxAge: maxAge * 1000 });
            return res.status(201).send({user:newUser._id})
        }catch(e){
            return res.status(400).send({ message:e.message })
        }
    }
)

auth.get("/auth/signin",(req,res)=>{})
auth.post("/auth/signin",(req,res)=>{})

auth.get("/auth/signup",(req,res)=>{
    return res.send({ msg:"Lontong" })
})




export default auth