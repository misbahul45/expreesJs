import exprees from "express"
import mongoose from "mongoose"
import passport from "passport"
import userRouter from "./router/userRouter.mjs"
import postsRouter from "./router/postsRouter.mjs"
const app=exprees()

mongoose.connect("mongodb://localhost:27017/latihan")
.then(()=>console.log("connected"))
.catch(()=>console.log("error"))

app.use(passport.initialize())
app.use(passport.initialize())
app.use(exprees.json())


//router
app.use(userRouter)
app.use(postsRouter)

app.listen(3000 ,()=>{
    console.log("running in Port",3000)
})


