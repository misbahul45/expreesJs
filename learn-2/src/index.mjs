import express from "express"
import session from  "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"


const app=express()

app.use(express.json())


app.listen(3001,()=>{
    console.log("app runing port 3001")
})