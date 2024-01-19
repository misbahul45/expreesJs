import { Router } from "express";
import { body, checkSchema, matchedData, validationResult } from "express-validator"
import users from "../api/users.mjs";
import {validateGetUserBySort, validatePostNewUser, validateUserPut } from "./schema/userSchema.mjs";

const userRouter=Router()

//get all User && get user by limit and favorite
userRouter.get('/api/users/:id?',
    (req, res, next)=>{
      const { params:{ id } }=req
      const getData=users.find((user)=>user.id===Number(id))
      if(id===undefined||id==null){
        return next()
      }
      return getData?
        res.send(getData)
        :
        res.status(400).send({ message: "Invalid Id please fetch with different Id" })
    },
    checkSchema(validateGetUserBySort),
    (req, res, next) => {
        const result = validationResult(req);
        const errorPaths = result.array().map((arr) => arr.path);
        if (errorPaths.includes('limit')&&errorPaths.includes('favorite')) {
          return res.send(users)
        } 
        return next();
    },
    (req, res) => {
      const { query: { limit=users.length, favorite="" } } = req;
      let userFilter=users.slice()
      if(limit!==undefined||limit!==null){
        favorite!==undefined || favorite!==""?
            userFilter=userFilter.filter((user) =>
                user.favorites.some((userFavorite) =>
                    userFavorite.toLowerCase().includes(favorite.toLowerCase())
                )
                ).slice(0, Number(limit))
        :
            userFilter.slice(0,Number(limit))
      }else{
        userFilter=userFilter.filter((user)=>{
            user.favorites.some((favorite)=>favorite.toLowerCase().includes(favorite.toLowerCase()))
        })
      }
      res.send(userFilter)
    }
  );

userRouter.post('/api/users',
checkSchema(validatePostNewUser),
(req,res)=>{
  const newUser=matchedData(req)
  console.log(req.body)
  const validateResult=validationResult(req)
  if(validateResult.array().length===0){
    users.push(newUser)
    return res.send(users)
  }else{
    return res.status(400).send({ 
      message:"Please Input a correct Data",
      error:validateResult.array()
    })
  }
})

userRouter.put("/api/users/:id",
checkSchema(validateUserPut)
,(req,res)=>{
  const { params:{ id }}=req
  const updateUsers=matchedData(req)
  const isUserDataId=users.some((user)=>user.id===Number(id)) 
  if(id!==undefined && isUserDataId){
    users.forEach((user,index)=>{
      if(user.id===Number(id)){
        users[index]={
          id,
          ...updateUsers
        }
      }
    })
    return res.send(users)
  }else{
    return res.send({ message:"Please input correct id" })
  }
})
  



export default userRouter