import { Router } from "express";
import { createToken, maxAge } from "../util/token.mjs";
import requireAuth from "../util/authMiddleware.mjs";

const cookieRouter=Router()

cookieRouter.get('/set-cookies',(req,res)=>{
    //res.setHeader('set-cookie','newUser=true')
    const token=createToken('78uiooyha08uso')
    //res.cookie('user-sign-in', token, { httpOnly:true, maxAge:maxAge*1000 })
    //res.cookie('newUser', false)
    //res.cookie('isEmplooye',true, {maxAge:1000*60*60*24, secure:true, httpOnly:true})
    return res.send({ msg:'You got the cookie' })
})

cookieRouter.get('/read-cookies',
requireAuth,
(req,res)=>{
    const cookies=req.cookies;
    res.json(cookies) 
})

export default cookieRouter