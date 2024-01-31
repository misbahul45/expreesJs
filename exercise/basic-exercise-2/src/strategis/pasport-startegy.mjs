import passport from "passport";
import { Strategy } from "passport-local";
import User from "../schema/user.mjs";
import { comparePassword } from "../utils/helper.mjs";

passport.serializeUser((user,done)=>{
    done(null,  user._id.toString())
})

passport.deserializeUser(
    async(id,done)=>{
    try{
        const findUser=await User.findById(id)
        if(!findUser){
            throw new Error("invalid credentials")
        }
        done(null, findUser)
    }catch(e){
        done(e, null)
    }
})

export default passport.use(
    new Strategy({usernameField:'email'},
    async(email, password, done)=>{
        try{
            const findUser=await User.findOne({ email })
            if(!findUser){
                throw new Error("invalid credentials")
            }else if(!comparePassword(password, findUser.password)){
                throw new Error("invalid password User")
            }
            done(null, findUser)
        }catch(e){
            done(e, null)
        }
    })
)