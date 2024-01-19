export const createValidationuserSchema={
    name:{
        isLength:{
            option:{
                min:5,
                max:20
            }
        },
        errorMessage:"Name must be at least 5-20",
        notEmpty:{
            errorMessage:"Name must be not empty"
        },
        isString:{
            errorMessage:"Name must be a text"
        }
    },
    bio:{
        notEmpty:true,
        isString:{
            errorMessage:"Bio must be a text"
        }
    }
}

