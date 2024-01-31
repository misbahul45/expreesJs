import { Router } from "express";
import { checkSchema, param, validationResult } from "express-validator";
import { createNewUser, getUserQuery, checkUserParam, checkUserPut, userAuth } from "../validation/user.mjs";
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
        const { bio, limit }=matchedData(req)
        if(errorResult.array().some((err)=>(err.path.includes('bio') && err.value!==undefined ) || (err.path.includes('limit') && err.value!==undefined))){
            return res.status(400).send({ message:"invalid credentials" })
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
    checkUserParam(),
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
       return res.json({ message:"succefully updated", users:usersApi })
    }
),

userRouter.put("/api/users/:id",
    checkUserParam(),
    checkUserPut(),
    (req, res)=>{
        const errorResult=validationResult(req)
        if(!errorResult.isEmpty()){
            return res.status(400).send({ error:errorResult.array() })
        }
        const userUpdate=matchedData(req)
        const isUserExist=usersApi.some((u)=>u.id===Number(userUpdate.id))
        if(!isUserExist){
            return res.status(400).send( { message:"invalid credentials" } )
        }
        usersApi.forEach((user,index)=>{
            if(user.id===Number(userUpdate.id)){
                usersApi[index]={
                    ...userUpdate,
                    id:Number(userUpdate.id)
                }
            }
        })
        return res.json({ message:"succefully updated", users:usersApi })
    }
)

userRouter.delete("/api/users/:id",
    param('id').notEmpty(),
    (req, res)=>{
        const erorResult=validationResult(req)
        const { id }=matchedData(req)
        if(id){
            return res.status(200).send({
                message:"Succesfully deleted",
                users:usersApi.filter((user)=>user.id!==Number(id))
            })
        }
        return res.status(400).send({ error:erorResult.array() })
    }
)

userRouter.post("/api/auth",
    (req,res)=>{
        const { email, password }=req.body
        const user=usersApi.find((user)=>user.email===email && user.password===password)
            if(user){
                req.session.user=user
                return res.status(200).send(user)
            }
        res.status(400).send({ message:"bad creadentials" })
    }
)

userRouter.get("/api/auth/status",(req, res)=>{
    req.sessionStore.get(req.sessionID, (err,session)=>{
        console.log(session)
    })
    return req.session.user?
        res.status(200).send(req.session.user)
        :
        res.status(400).send({ message:"not authenticated" })
})

userRouter.post("/api/cart",(req, res)=>{
    req.sessionStore.get(req.sessionID, (err,session)=>{
        console.log(session)
    })

    if(!req.session.user){
        return res.sendStatus(400)
    }
    const { body:item }=req
    const { cart }=req.session
        if(cart){
            cart.push(item)
        }else{
            req.session.cart=[item]
        }
    return res.send(item)

})

userRouter.get("/api/cart",(req,res)=>{
    if(!req.session.user){
        return res.sendStatus(400)
    }
    const { cart }=req.session
    return res.send(cart || [])
})

export default userRouter