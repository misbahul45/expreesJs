import { Router } from "express";
import { users } from "../api/users.mjs";

const  userRouter=Router()

userRouter.get("/users",(req, res)=>{//using cookie parser withput header it can be still get a value from parent\
    console.log(req.signedCookies.login)
    console.log(req.session)
    console.log(req.session.id)
    if(req.signedCookies.login&&req.signedCookies.login==="world"){
        return res.send(users)
    }
    return res.status(400).send({ message:"please use correct cookie" })
})

userRouter.post("/users",(req,res)=>{
    const { body:{ name, bio } }=req
    const findUser=users.find((user)=> user.name === name && user.bio===bio)
    if(!findUser){
        return res.status(401).send({ msg:"Bad Crediential" })
    }
    req.session.user=findUser
    return res.status(200).send(findUser)
})

userRouter.get("/users/auth/status", (req, res)=>{
    console.log(req.session.user)
    return req.session.user?
        res.status(200).send(req.session.user)
    :
        res.status(401).send({ msg:"Not Authenticated" })
})

export default userRouter