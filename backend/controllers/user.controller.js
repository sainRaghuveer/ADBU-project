const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();



const userSignup = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    try {
        const userExist = await userModel.find({ email });
        if (userExist.length) {
            res.status(200).send({ message: "User is already exists" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(500).send({ "message": "error in bcrypt" });
                } else {
                    try {
                        const user = new userModel({ firstName, lastName, email, password:hash });
                        await user.save();

                        res.status(200).send("User registered successfully");
                    } catch (error) {
                        res.status(400).send({
                            message: error.message,
                            error: error
                        });
                        console.log(error)
                    }
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
};

const userLogin = async (req, res) => {
    let { email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            bcrypt.compare(password, userExist.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({userId: userExist._id}, process.env.secret, { expiresIn: '24h' });
                    res.status(200).send({ message: "User logged in successfully", token:token, user:userExist });
                } else {
                    res.status(400).send({ message: "Wrong credentials" });
                }
            });
        } else {
            res.status(400).send("User does not exist");
        }

    } catch (error) {
        console.log(error)
    }

};


module.exports = {
    userSignup, userLogin
}