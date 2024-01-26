import express from "express"
import session from  "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import userRouter from "./router/users.mjs"

const app=express()
app.use(express.json())
app.use(userRouter)

app.listen(3001,()=>{
    console.log("app runing port 3001")
})