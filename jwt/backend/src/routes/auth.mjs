import { Router } from "express";
import { signInValidator, signUpValidator } from "../validator/auth.mjs";
import { matchedData, validationResult } from "express-validator";
import User from "../Schema/user.mjs";
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
            const existingUser =await User.findOne({email:data.email})
           if (existingUser) {
              return res.status(400).json({ message: "Email already exists" });
            }      
            const newUser=new User(data)
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
auth.post("/auth/signin",
    signInValidator(),
    async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(500).send({message:errors.array()})
        }
        const { email, password }=matchedData(req)
        try{
            const isUser=await User.login(email, password)
            if(!isUser.message){
                const token=createToken(isUser._id)
                res.cookie('user_sign_in',token,{ httpOnly:true,maxAge:1000*maxAge  })
                return res.status(200).send({ user:isUser._id })
            }
            return res.status(500).send(isUser)
        }catch(e){
            res.status(500).json({ message:e.message })
        }
        
    }
)

auth.get("/auth/logout",(req,res)=>{
    res.cookie("user_sign_in",'', { maxAge:1 })
    return res.status(200).send({ message:"Succesfully logout" })
})


auth.get("/auth/signin",(req,res)=>{
    
})
auth.get("/auth/signup",(req,res)=>{
    return res.send({ msg:"Lontong" })
})




export default auth