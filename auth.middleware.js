const jwt = require("jsonwebtoken")

function authorizationMiddleware(req,res,next) {

    const token = req.headers["auth"]

    if(!token){
        return res.status(401).send({
            status:"failed",
            message: "Token must be provided"
        })
    }
    const result = jwt.verify(token, process.env.SECRET_KEY)
    req.user = {id:result.id, username:result.username}
    
    next()


}


module.exports = authorizationMiddleware