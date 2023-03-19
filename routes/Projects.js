require("dotenv");
require("../config/database");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const app = express();

app.use(express.json());

router.post("/save-project", auth, async (req,res) =>{
    
});