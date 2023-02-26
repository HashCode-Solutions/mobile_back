require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.get("/user",(req,res)=>{
    res.send("hello user");
});


module.exports = userRout;


