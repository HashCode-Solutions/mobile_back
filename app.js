require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const app = express();

app.use(express.json());

//define routes 
const registerRoute = require("./routes/Register");
const userRoute = require("./routes/Users");
const projectCreationRoute = require("./routes/Projects"); 

app.use("/register", registerRoute);
app.use("/user", userRoute);
app.use("/project-creation",projectCreationRoute);

//login
app.post("/login", async (req,res)=>{
    //register login here
    try {
        //get user input
        const { email, password } = req.body;

        //validate user input
        if (!(email && password)) {
            res.status(400).send("All input are required");
        }

        //validate if user exist in our database
        const user = await User.findOne({email});
        
        if (user && (await bcrypt.compare(password, user.password))) {
            //create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" },
            );

            //save user token
            user.token = token;

            //user
            res.status(200).json(user);
        }

        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;