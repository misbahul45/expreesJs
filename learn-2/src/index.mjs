import express from "express"
import session from  "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import "./strategies/local-strategy.mjs"
import userRouter from "./router/userRoute.mjs"

const app=express()

app.use(express.json())
app.use(session({
    secret:"takin123",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:600000*60,
    }
}))
app.use(passport.initialize())

app.post('/api/auth',
    passport.authenticate("local",{
        failureRedirect: '/login-failed',
        failureFlash: true 
    }),
    (req, res)=>{
        
    }
)
app.use(userRouter)


app.listen(3001,()=>{
    console.log("app runing port 3001")
})