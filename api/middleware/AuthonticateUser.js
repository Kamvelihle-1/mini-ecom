const {sign,verify} = require('jsonwebtoken')
require('dotenv').config()

function createToken(user) {
    return sign({
        emailAdd :user.emailAdd,
        userPass: user.userPass
    },process.env.SECRET_KEY,
    {
        expiresIn: "1h"
    }) 
}

function verifyToken(req,res,next){
    const token = req.header["authorization"]

    return verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) {
            res.json({
                msg:"Token authontication failed"
            })
        }

        req.decoded =decoded
        next()
    })
}

module.exports={
    createToken,
    verifyToken
}