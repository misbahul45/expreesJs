import { Router } from "express"
import { signUp_validation } from "../validation/userValidation.mjs"
import { matchedData, validationResult } from "express-validator"
import User from "../schema/user.mjs"
import passport from "passport"
import { hashPassword } from "../utils/helper.mjs"

const userRouter=Router()

userRouter.post("/api/auth/signup", 
    signUp_validation(),
    async(req, res)=>{
        try{
            const errorResult=validationResult(req)
            const data=matchedData(req)
            const isUserAuth=await User.findOne({ email:data.email })
            if(!errorResult.isEmpty()){
                return res.status(401).send({ error:errorResult.array() })
            }else if(isUserAuth){
                throw new Error("email is already use")
            }
            data.password=hashPassword(data.password)
            const newUser=new User(data)
            const savedUser=await newUser.save()
            if(!savedUser){
                throw new Error("Server is error")
            }
            return res.status(200).send({ msg:"succesfully signUp" })
        }catch(e){
            return res.status(401).send({ msg:e.message })
        }
    }
)

userRouter.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    return req.user ? res.status(200).send({ msg: "Successfully login" }) : res.sendStatus(401);
});

userRouter.get("/api/auth/status",(req, res)=>{
    console.log(req.session)
    return req.session?res.status(200).send(req.session.passport):res.sendStatus(401)
})




export default userRouter