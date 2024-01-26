import { Router } from "express";
import { checkSchema, param, validationResult } from "express-validator";
import { createNewUser, getUserQuery, patchUser } from "./validation/user.mjs";
import usersApi from "../api/usersApi.mjs";
import { matchedData } from "express-validator";


const userRouter=Router()

userRouter.get("/api/users/:id?",
    param('id').notEmpty(),
    (req, res, next)=>{
       const errorResult=validationResult(req)
       if(!errorResult.isEmpty()){
            return next()
        }
        const { id }=matchedData(req)
        const user=usersApi.find((user)=>user.id===Number(id))
        if(!user){
            return res.status(400).send({ message:"error user id" })
        }
         return res.json(user)
    },
    checkSchema(getUserQuery),
    (req,res,next)=>{
        const errorResult=validationResult(req)
        console.log()
        const { bio, limit }=matchedData(req)
        if(errorResult.array().some((err)=>(err.path.includes('bio') && err.value!==undefined ) || (err.path.includes('limit') && err.value!==undefined))){
            return res.status(400).send({ message:"Invalid credentials" })
        }
        if(!bio && !limit){
            return next()
        }
        const users=usersApi.filter((user)=>user.bio.toLowerCase().includes(bio.toLowerCase()))
        return res.send(users.slice(0,limit))
    },
    (_, res)=>{
        res.json(usersApi)
    }
)

userRouter.post("/api/users",
    createNewUser(),
    (req, res) => {
        const errorResult = validationResult(req);

        if (!errorResult.isEmpty()) {
            return res.status(400).json({ errors: errorResult.array() });
        }

        const user = matchedData(req);
        const isUserAunthenticated=usersApi.includes(user.email)
        if(isUserAunthenticated){
            return res.send({ message:"user already exists" })
        }
        usersApi.push({
            id: usersApi.length,
            ...user,
            bio: "",
            posts: [],
            favorites: []
        });

        return res.json({ message: "User created successfully", user: user });
    }
);

userRouter.patch("/api/users/:id",
    patchUser(),
    (req,res)=>{
       const { body:updateItemUser } =req 
       const updateUsersItem=Object.entries(updateItemUser)
       const errorResult=validationResult(req)
       const { id } =matchedData(req)
       const user=usersApi.find((user)=>user.id===Number(id))

       if(!errorResult.isEmpty()){
        return res.status(400).send({ error :errorResult.array() })
       }else if(!user){
        return res.status(400).send({ message :"user didn't exist" })
       }else{
        updateUsersItem.forEach(([key, value])=>{
            user[key]=value
        })
       }
       return res.json({ message:"succefully updated", user })
    }
)










export default userRouter