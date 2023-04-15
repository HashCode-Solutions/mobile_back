require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const CustomObject = require('../dto/CustomObject');

const app = express();

app.use(express.json());

//register
router.post("/", async (req,res) => {
    let customObject = new CustomObject("");
    //register login here
    try {
        const { first_name, last_name, mobile_number, email, password } = req.body;

        //validate user input
        if(!(email && password && first_name && last_name && mobile_number)){
            customObject.Message = "All inputs are required"; 
            res.status(400).json(customObject);
        }

        //check user is already exists
        //validate if user exist in our database
        const oldUser = await User.findOne({email});

        if(oldUser){
            customObject.Message = "User Already Exist. Please Login";
            return res.status(400).json(customObject);
        }

        //encrypt user password
        encryptPassword = await bcrypt.hash(password,10);
        
        //create user in our database
        const user = await User.create({
            first_name,
            last_name,
            mobile_number,
            email,
            password: encryptPassword,
        });

        //create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h", }
        );

        //save user token
        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        console.log(error);        
    }
});

module.exports = router;
