import express from "express"
import cors from "cors"
import mongoose from "mongoose"
const app=express()

mongoose.connect("")


app.use(express.json())
app.use(cors())

app.get("/",(_, res)=>{
    res.redirect('/home')
})
app.listen(3000,()=>{
    console.log("running")
})
