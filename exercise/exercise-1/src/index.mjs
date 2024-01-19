import express from "express"
import userRouter from "./router/userRoute.mjs"
const app=express()
app.use(express.json())
app.use(userRouter)


app.listen(3000,()=>{
    console.log("running in PORT 3000")
})