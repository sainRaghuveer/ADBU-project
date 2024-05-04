const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
require('dotenv').config();


const authenticationCheck = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);

    jwt.verify(token, process.env.secret, async(err, decoded)=> {
        // console.log(decoded);
        if(err){
            res.status(401).send({message:"JWT verification error", error:err});
        }else{
            try {
                const matchedUser = await userModel.findById(decoded.userId);
                if(matchedUser){
                    req.headers.userId = decoded.userId;
                    next();
                }else{
                    res.status(401).send({message:"User not found"})
                }
            } catch (error) {
                res.status(401).send({message:error.message});
                console.log(error);
            }
        }
    });
}


module.exports={
    authenticationCheck
}