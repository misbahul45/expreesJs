import { param, query, body } from "express-validator"
export const param_validation=()=>{
    return[param("id").notEmpty().withMessage("invalid Id").isString().withMessage("invalid Id")]
}

export const query_validation=()=>{
    return [
        query("title").notEmpty().isString(),
        query("author").notEmpty().isString(),
        query("limit").notEmpty().isInt({min:1})
    ]
}

export const body_validation=()=>{
    return [
        body('title').notEmpty().isString(),
        body('author').notEmpty().isString(),
        body('body').isArray(),
    ]
}