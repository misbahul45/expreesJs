import { Router } from "express";

const cookieRouter=Router()

cookieRouter.get('/set-cookies',(req,res)=>{
    //res.setHeader('set-cookie','newUser=true')
    res.cookie('newUser', false)
    res.cookie('isEmplooye',true, {})
    return res.send({ msg:'You got the cookie' })
})

cookieRouter.get('/read-cookies',(req,res)=>{
    
})

export default cookieRouter