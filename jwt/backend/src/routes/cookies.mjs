import { Router } from "express";

const cookieRouter=Router()

cookieRouter.get('/set-cookies',(req,res)=>{
    //res.setHeader('set-cookie','newUser=true')
    res.cookie('newUser', false)
    res.cookie('isEmplooye',true, {maxAge:1000*60*60*24, secure:true, httpOnly:true})
    return res.send({ msg:'You got the cookie' })
})

cookieRouter.get('/read-cookies',(req,res)=>{
    const cookies=req.cookies;
    res.json(cookies) 
})

export default cookieRouter