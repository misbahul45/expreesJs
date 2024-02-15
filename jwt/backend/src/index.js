import express from "express"
import mongoose from "mongoose"
import auth from "./routes/auth.mjs"
import cors from "cors"
import cookieRouter from "./routes/cookies.mjs"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(cookieParser())
app.use(express.json())

app.use(auth)
app.use(cookieRouter)
mongoose.connect("mongodb://localhost:27017/Jwt")
.then(()=>console.log("conected db")).catch((e)=>console.log("err", e))

app.get("/", (_, res) => {
    return res.redirect("/auth/sign-in");
});


//router

app.listen(4000, ()=>{
    console.log("Running")
})