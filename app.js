require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const CustomObject = require("./dto/CustomObject");

const app = express();

app.use(express.json());

//define routes 
const registerRoute = require("./routes/Register");
const userRoute = require("./routes/Users");
const projectCreationRoute = require("./routes/Projects");
const marketPriceRoute = require("./routes/MarketPrice"); 

app.use("/register", registerRoute);
app.use("/user", userRoute);
app.use("/project-creation",projectCreationRoute);
app.use("/market-price",marketPriceRoute);

//login
app.post("/login", async (req,res)=>{
    let customObject = new CustomObject("");
    //register login here
    try {
        //get user input
        const { email, password } = req.body;

        //validate user input
        if (!(email && password)) {
            customObject.Message = "All input are required"; 
            res.status(400).json(customObject);
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

        customObject.Message = "Invalid Credentials"; 
        res.status(400).json(customObject);
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;