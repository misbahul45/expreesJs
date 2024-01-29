import { Router } from "express";

const productRouter=Router()

productRouter.get("/api/products",(req,res)=>{
    console.log("product",req.session)
    console.log(req.session.id)
    const { signedCookies:{hello} }=req
    console.log(hello)
    if(hello=="my first cookie"){
        return res.json({
            id:1,
            name:'product',
            price:2.2
        })
    }
    res.send({ message:"Error cookie" })
})


export default productRouter