import { Router } from "express";
import { signUpValidator } from "../validator/auth.mjs";
import { matchedData, validationResult } from "express-validator";
import Signup from "../Schema/user.mjs";

const auth=Router()

auth.get("/auth/sign-in",(req,res)=>{})
auth.post("/auth/sign-in",(req,res)=>{})

auth.get("/auth/sign-up",(req,res)=>{})

auth.post("/auth/sign-up",
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
            newUser.save()
            if(!newUser){
                throw new Error("invalid credentials")
            }
            return res.status(201).send({
                user:newUser,
                message: "User created successfully",
            })
        }catch(e){
            return res.status(400).send({ message:e.message })
        }
    }
)



export default auth