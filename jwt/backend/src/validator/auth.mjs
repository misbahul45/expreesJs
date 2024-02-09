import { body } from "express-validator"
export const signUpValidator=()=>{
    return [
        body('username').isString().notEmpty().withMessage('empty username'),
        body('email').isString().notEmpty().isEmail().withMessage('empty email'),
        body('password').isString().isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
        body('isAdmin').isBoolean().notEmpty().withMessage("empty isAdmin")
    ]
}