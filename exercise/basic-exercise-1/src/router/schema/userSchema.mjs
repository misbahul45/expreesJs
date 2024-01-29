const convertDataToNum=(value, { req })=>{
    if(value!==undefined && value !==null){
        const numericValue=parseFloat(value)
        if(!isNaN(numericValue)){
            return numericValue
        }else{
            throw new Error("Limit must be a number")
        }
    }
    throw new Error("Limit must be a number")
}
const convertDataNumber=(value, { req })=>{
    if(value!==undefined && value !==null){
        if(value===Number(value)){
            return value
        }else{
            throw new Error("Value must be a number")
        }
    }
    throw new Error("Value must be a number")
}


export const validateGetUserBySort={
    limit:{
        custom:{
            options:convertDataToNum,
        },
        notEmpty:{
            errorMessage:"Cannot get Empty Limit"
        }
    },
    favorite:{
        notEmpty:false,
        isString:{
            errorMessage:"Favorite must be a text"
        }
    }
}

export const validatePostNewUser={
    id:{
        notEmpty:{
            errorMessage:"Id cannot be empty"
        },
        custom:{
            options:convertDataNumber,
        }
    },
    name:{
        notEmpty:{
            errorMessage:"Name cannot be empty",
        },
        isString:{
            errorMessage:"name Must Be a text"
        },
        isLength:{
            option:{
                min:3,
                max:25
            }
        }
    },
    bio:{
        isString:{
            errorMessage:"Bio must be a text"
        }
    },
    posts: {
        notEmpty:true,
        isArray: {
          errorMessage: "Posts must be an array",
          options: true,
        },
      },
    favorites: {
        isArray: {
          errorMessage: "Favorites must be an array",
          options: true,
        },
    },
}

export const validateUserPut={
    name:{
        notEmpty:{
            errorMessage:"Name cannot be empty",
        },
        isString:{
            errorMessage:"name Must Be a text"
        },
        isLength:{
            option:{
                min:3,
                max:25
            }
        }
    },
    bio:{
        isString:{
            errorMessage:"Bio must be a text"
        }
    },
    posts: {
        notEmpty:true,
        isArray: {
          errorMessage: "Posts must be an array",
          options: true,
        },
      },
    favorites: {
        isArray: {
          errorMessage: "Favorites must be an array",
          options: true,
        },
    },
}