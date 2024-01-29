import { Router } from "express"

const userRouter=Router()


userRouter.get("/api/users", (_, res)=>{
    res.status(200).send({ msg:"connected" })
})




export default userRouter