import express from "express"
import mongoose from "mongoose"
import auth from "./routes/auth.mjs"

const app=express()
mongoose.connect("mongodb://localhost:27017/Jwt")
.then(()=>console.log("conected db")).catch((e)=>console.log("err", e))
app.use(express.json())

app.get("/",(_, res)=>{
    return res.redirect("/home")
})
app.use(auth)

app.listen(3000,()=>{
    console.log("running server")
})