import express from "express"
import mongoose from "mongoose"
import auth from "./routes/auth.mjs"
import cors from "cors"
import cookieRouter from "./routes/cookies.mjs"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors())
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/Jwt")
.then(()=>console.log("conected db")).catch((e)=>console.log("err", e))
app.use(express.json())

app.get("/",(_, res)=>{
    return res.redirect("/auth/sign-in")
})

//router
app.use(auth)
app.use(cookieRouter)

app.listen(3000, ()=>{
    console.log("Running")
})