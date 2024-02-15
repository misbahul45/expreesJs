import jwt from "jsonwebtoken"

const requireAuth=(req, res, next)=>{
    const token=req.cookies.user_sign_in
    //check token
    if(token){
        jwt.verify(token, 'misbahul secret', (err, decoded)=>{
            if(err){
                return res.redirect('http://localhost:5173/auth/sign-in')
            }else{
                next()
            }
        })
    }
    return res.redirect('http://localhost:5173/auth/sign-in')
}

export default requireAuth