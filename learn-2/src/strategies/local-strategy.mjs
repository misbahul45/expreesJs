import passport from "passport";
import { Strategy } from "passport-local";
import usersApi from "../api/usersApi.mjs";

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    try{
        const findUser=usersApi.find((user)=>user.id===id)
        if(!findUser){
            throw new Error("user not found")
        }
        done(null, findUser)
    }catch(err){
        done(err, null)
    }
})

export default passport.use(
    new Strategy((username, password, done)=>{
        console.log(username, password)
        try{
            const findUser=usersApi.find((user)=>user.username===username)
            if(!findUser){
                throw new Error("Users not found")
            }
            if(findUser.password!==password){
                throw new Error("Invalid credentials") 
            }
            done(null, findUser)
        }catch(err){
            done(err, null);
        }
    })
)