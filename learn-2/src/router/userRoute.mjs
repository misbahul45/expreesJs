import { Router } from "express";
import { body, checkSchema, matchedData, validationResult } from "express-validator"
import {validateGetUserBySort, validatePostNewUser, validateUserPut } from "./schema/userSchema.mjs";
import usersApi from "../../api/usersApi.mjs";

const userRouter=Router()

//get all User && get user by limit and favorite
userRouter.get('/api/users/:id?',
    (req, res, next)=>{
      const { params:{ id } }=req
      const getData=usersApi.find((user)=>user.id===Number(id))
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
          return res.send(usersApi)
        } 
        return next();
    },
    (req, res) => {
      const { query: { limit=usersApi.length, favorite="" } } = req;
      let userFilter=usersApi.slice()
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
    usersApi.push(newUser)
    return res.send(usersApi)
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
  const updateusersApi=matchedData(req)
  const isUserDataId=usersApi.some((user)=>user.id===Number(id)) 
  if(id!==undefined && isUserDataId){
    usersApi.forEach((user,index)=>{
      if(user.id===Number(id)){
        usersApi[index]={
          id,
          ...updateusersApi
        }
      }
    })
    return res.send(users)
  }else{
    return res.send({ message:"Please input correct id" })
  }
})
  



export default userRouter