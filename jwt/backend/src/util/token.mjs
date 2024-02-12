import jwt from "jsonwebtoken"
export const maxAge=3*24*60*60
export const createToken=(id)=>{
    return jwt.sign({ id }, 'misbahul secret', { 
        expiresIn:maxAge
    })
}