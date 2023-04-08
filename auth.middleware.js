

function authorizationMiddleware(req,res,next) {

    const token = req.headers["auth"]

    if(!token){
        return res.status(401).send({
            status:"failed",
            message: "Token must be provided"
        })
    }

    next()


}


module.exports = authorizationMiddleware