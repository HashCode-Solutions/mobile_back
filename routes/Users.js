require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const app = express();

app.use(express.json());

//get user details
router.get("/get-user", auth, async (req,res) =>{
    res.send({data:"get user data"});
});

module.exports = router;




