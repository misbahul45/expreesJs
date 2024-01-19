import express from "express"

const app=express()

app.get("/",(req, res)=>{
    res.send({msg:"hallo"})
})

app.listen(3001,()=>{
    console.log("app runing port 3001")
})