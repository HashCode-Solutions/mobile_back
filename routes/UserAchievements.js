require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userAchievementsSchema = require("../model/userAchievements");
const app = express();

const CustomObject = require('../dto/CustomObject');

app.use(express.json());

//constant list of achievements
let achievementsList = [
    {
        id:"AC001",
        title:"Mango",
        img_url:"sdsdasd",
        description:"asdnsa snajnsdjas njasd",
        isActive: false
    },
    {
        id:"AC002",
        title:"Tomato",
        img_url:"sdsdasd",
        description:"asdnsa snajnsdjas njasd",
        isActive: false
    },
    {
        id:"AC003",
        title:"Carrot",
        img_url:"sdsdasd",
        description:"asdnsa snajnsdjas njasd",
        isActive: false
    }
]

//add user achievements
router.post("/add-user-achievements", async (req, res) => {
    let customObject = new CustomObject("");
    let userObject = req.body;
    try {
        let query = { userId: userObject.id };
        const userAchievements = await userAchievementsSchema.findOne(query);
        if (!userAchievements) {
            let newUserAchievement = {
                userId: userObject.id,
                achievements: getAchievementList(userObject.achievemntId)
            }
            await userAchievementsSchema.create(newUserAchievement);
        }else{
            customObject.Message = "No achievements fund";
            res.status(400).json(customObject);
        }
    } catch (error) {
        console.log(error);
        customObject.Message = "Server error";
        res.status(500).json(customObject);
    }
});

//get user achievements
router.get("/user-achievements/:id", auth, async (req, res) => {
    let customObject = new CustomObject("");
    try {
        let query = { userId: req.params.id };
        const userAchievements = await userAchievementsSchema.findOne(query);
        if (userAchievements) {
            res.status(200).json(userAchievements);
        }
        customObject.Message = "No achievements fund";
        res.status(400).json(customObject);
    } catch (error) {
        console.log(error);
        customObject.Message = "Server error";
        res.status(500).json(customObject);
    }
});


function getAchievementList(achievementId) {
    achievementsList.map(result => {
        if (achievementId === result.id) {
            result.isActive = true;   
        }
        return {result};
    });
}

module.exports = router;