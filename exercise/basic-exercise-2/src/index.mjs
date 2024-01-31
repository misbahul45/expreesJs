import exprees from "express"
import mongoose from "mongoose"
import passport from "passport"
import MongoStore from "connect-mongo"
import expressSession from "express-session"
import userRouter from "./router/userRouter.mjs"
import postsRouter from "./router/postsRouter.mjs"
// import "./strategis/pasport-startegy.mjs"
import "./strategis/paspot-discord.mjs"

const app=exprees()

mongoose.connect("mongodb://localhost:27017/latihan")
.then(()=>console.log("connected"))
.catch(()=>console.log("error"))

app.use(exprees.json())
app.use(expressSession({
    secret:"posts app",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000*70*60
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient()
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(userRouter)
app.use(postsRouter)

app.get("/",(_,res)=>{
    res.redirect("/api/posts")
})
app.get("/api/auth/discord/redirect",passport.authenticate("discord"),(req,res)=>{
    return req.session.passport?res.status(200).send({ msg:"succesfully Login" }):res.statusCode(400)
})


app.listen(3000 ,()=>{
    console.log("running in Port",3000)
})


