const express = require("express");
const { userSignup, userLogin } = require("../controllers/user.controller");


const userRoute = express.Router();

userRoute.post("/api/signup", userSignup);
userRoute.post("/api/login", userLogin);


module.exports={
    userRoute
}