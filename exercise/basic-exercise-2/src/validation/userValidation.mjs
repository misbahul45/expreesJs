import { body } from "express-validator"

export const signUp_validation=()=>{
    return[
        body('username').notEmpty().isString(),
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isLength({ min:8 }).withMessage("password must at least 8+ char")
    ]
}