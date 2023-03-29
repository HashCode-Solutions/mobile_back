require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

//get user details
router.get("/get-user", auth, async (req, res) => {
  res.send({ data: "get user data" });
});

//update user details by userId
router.put("/update-user/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    let userData = req.body;
    //encrypt user password
    encryptPassword = await bcrypt.hash(req.body.password, 10);
    userData.password = encryptPassword;
    let updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    updatedUser.password = req.body.password;
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;