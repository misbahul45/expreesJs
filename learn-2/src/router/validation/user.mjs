import { check, param } from "express-validator";

export const getUserQuery={
    bio:{
        isString:{},
        notEmpty:true,
        isLength:{
            custom:{
                min:3,
            }
        }
    },
    limit:{
        isNumeric:true,
        notEmpty:true,
        default:5,
    }
} 

export const createNewUser=()=>{
    return[
        check('username').notEmpty().isString(),
        check('email').isEmail(),
        check('password', 'The password must be 8+ chars long and contain a number')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 8 })
        .matches(/\d/).matches(/[A-Z]/),
    ]
}
export const patchUser=()=>{
    return[
        param('id').isNumeric().notEmpty().withMessage("Cannot empty Id")
    ]
}