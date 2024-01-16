import express from 'express'
import { users } from './api/users.mjs'
const app =express()
app.use(express.json())
const PORT=process.env.PORT || 3000

app.get('/api/users',(req, res)=>{
    const { query:{ bio } }=req
    if(bio){
        const getUser=users.find((u)=>(u.bio.toLowerCase()).includes(req.query.bio.toLowerCase()))
        getUser?
        res.status(getUser?200:405).send(getUser || {
            message:"invalid bio message"
        })
        :
        res.send(users)
    }else{
        res.send(users)
    }
})

app.post("/api/users",(req,res)=>{
    const { body:{ id, name } }=req;
    if(id){
        if(name!==""){
            users.push(req.body)
            res.send(users)
        }else{
            res.status(407).send({
                message:"Name cannot empty"
            })
        }
    }else{
        res.status(407).send({
            message:"Invalid id"
        })
    }        
})


app.get('/api/users/:id',(req, res)=>{
    const { params:{ id } }=req
    const idUser=parseInt(id)
    const user=users.find((u)=>u.id===idUser)
    user?
    res.send(user)
    :
    res.status(400).send( 
        {
            message:"Bad Request, Invalid Id"
        })
})
app.put('/api/users/:id',(req,res)=>{
    const {  body, params:{ id } }=req
    const userIndex=users.findIndex((u)=>u.id===parseInt(id))
    if(userIndex!==-1){
        users[userIndex]={ id:Number(id), ...body}
    }else{
        res.status(408).send( { message:"Invalid Id User" } )
    }
})

app.patch('/api/users/:id',(req,res)=>{
    const { body, params:{ id } }=req
    if(id){
        const user=users.find((u)=>u.id===parseInt(id))
        if(user){
            user.bio=body.bio
            res.send(user)
        }else{
            res.status(410).send({ message:"Invalid Id user" })
        }
    }
})

app.delete('/api/users/:id',(req,res)=>{
    const { params:{ id } }=req
    res.send(users.filter((u)=>u.id!==parseInt(id)))
})


app.get("/api/users/:idUser/books",(req, res)=>{
    const { params:{ idUser} }=req;
    if(idUser){
        const user=users.find((u)=>u.id===Number(idUser))
        user?res.send(user.books):res.status(205).send({
            message:"invalid Id user"
        })
    }
})
app.post("/api/users/:idUser/books",(req, res)=>{
    const { params:{ idUser} }=req;
    if(idUser){
        const user=users.find((u)=>u.id===Number(idUser))
        if(user){
            user.books.push(req.body)
            res.send(user)
        }else{
            res.send({ message:"Missing Id User" })
        }
    }else{
        res.send({ message:"invalid Id!" })
    }
})
app.get("/api/users/:idUser/books/:idBooks",(req,res)=>{
    const { params:{ idUser, idBooks } }=req
    if(idUser){
        const user=users.find((u)=>u.id===Number(idUser))
        if(idBooks&&user){
            const getUserBooks=user.books.find((book)=>book.id===Number(idBooks))
            getUserBooks?res.send(getUserBooks):res.status(207).send({
                message:"invalid Id Books"
            })
        }else{
            res.status(207).send({
                message:"invalid Id User"
            })
        }
    }
})





app.listen(PORT, ()=>{
    console.log("app is runing in server")
})