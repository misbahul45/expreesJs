# User API Spec
## Register User API
    endpoint: POST /api/auth
    Request Body :
        {
            "username":"knixxen",
            "password":"knixxen123"
            "name":"knixxen Enggine"
        }

    Response Body Success :
        {
            "data":{
                "username":"knixxen",
                "name":"knixxen Enggine"
            }
        }
    Response Body Errors :
        {
            "errors":"username already registered"
        }
## Update User API
    endpoint: POST /api/users/login

    Request Body:
        {
            "username":"knixxen",
            "password":"knixxen123"
        }
    Response Body Success:
        {
            "data":{
                "token":"unique-token"
            }
        }
    Response Body Erros :
        {
            "errors":"Username or password wrong"
        }
## update User API
    endpoint : PACTH /api/users/current
    Heders :
        Authorization:token

    Request Body:
        {
            "username":"knixxen",
            "password":"knixxen123"
        }
    Response Body Success:
        {
            "data":{
                "username":"knixxen",
                "password":"knixxen123"
            }
        }
    Response Body Errors:
        {
            "errors":"Name Length max 100"
        }
## Get User API
    endpoint:GET /api/users/current
        Heders :
            Authorization:token
    Response Body Success:
        {
            "data":{
                "username":"knixxen",
                "name":"knixxen Enggine"
            }
        }
    Response Body Errors:
        {
            "errors":"not authorizated"
        } 
## Logout User API
    endpoint: DELETE /api/users/logout
        Heders :
            Authorization:token
    Response Body Success :
        {
            "data":"ok"   
        } 
    Response Body Errors :
        {
            "errors":"not authorizated"
        } 