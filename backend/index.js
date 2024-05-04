const express = require("express");
const { connectDB } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { authenticationCheck } = require("./middlewares/auth.middleware");
require('dotenv').config();

const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    res.send(`<h1> Welcome to ADBU project's backend<h1>`);
});

app.use("/", userRoute);


app.use(authenticationCheck);


app.get("/about", (req, res)=>{
    res.send("welcome to about route");
})


app.listen(process.env.PORT, async()=>{
    try {
        await connectDB;
        console.log("Connected with database")
    } catch (error) {
        console.log(error);
    }

    console.log(`Server is running at port ${process.env.PORT}`);
});

