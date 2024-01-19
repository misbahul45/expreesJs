import express from 'express'
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator'
import { users } from './api/users.mjs'
import { createValidationuserSchema } from './validator/valiadtionSchema.mjs'
import cookieParser from "cookie-parser"
import userRouter from './router/users.mjs'
import session from "express-session"


const app =express()
const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser("hello world"))
app.use(session({
    secret:'misbahul software engine',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60,
    }
}))
app.use(userRouter)
const loggingMiddleware=(req,res,next)=>{

    next();
}

app.use(loggingMiddleware)

app.get('/', (req, res) => {
   //res.cookie("hello", "world", { message: "My first Cookie" });
   //res.cookie("login", "world", { signed:true });
   req.session.visited=true
    console.log(req.headers.cookie)//header it is use for get cookie in different router

    return res.send({ message: "hallo" });
});

app.get('/api/users',
    query('bio').isString().notEmpty().withMessage("Must be Not Empty").isLength({ min:3,  max:10}).withMessage("Mins length is 3"),
(req, res)=>{
    
    const result=validationResult(req)
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

app.post("/api/users",
checkSchema(createValidationuserSchema)
,(req,res)=>{
    const result=validationResult(req)
    //const { body:{ id, name } }=req; //cara 1
    const { id, name }=matchedData(req) //cara 2 dan lebih efisien

    if(!result.isEmpty()){
        return res.status(400).send({
            errors:result.array()
        })
    }
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


app.get('/api/users/:id',(req, res, next)=>{    
    if(!isNaN(Number(req.params.id)))next()
},(req, res)=>{
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



//get userBooks

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