import express from "express"
import session from  "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import userRouter from "./router/users.mjs"
import productRouter from "./router/products.mjs"
import "./strategies/local-strategy.mjs"
import mongoose from "mongoose"
import authRouter from "./router/userAuth.mjs"


const app=express()

mongoose.connect("mongodb://localhost:27017/users")
.then(()=>console.log("connected"))
.catch(()=>console.log("error conected"))


app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret:'takin dev',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60*1200
    }
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(userRouter)
app.use(productRouter)
app.use(authRouter)

app.get("/",(req, res)=>{
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited=true;
    res.cookie("hello","my first cookie", { maxAge:6000*60*100, signed:true })
    res.send({msg:"hello"})
})


app.post('/api/users/auth', passport.authenticate("local"),(req, res)=>{
    res.status(200).send({ message:"Succesfully login" })
})
app.get("/api/users/auth/status",(req, res)=>{
    console.log(req.user)
    return req.user?
        res.status(200).send(req.user):res.sendStatus(400)
})

app.listen(3001,()=>{
    console.log("app runing port 3001")
})