require("dotenv");
require("../config/database");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const projectCreation = require("../model/projectCreation");

const app = express();

app.use(express.json());

//save project 
router.post("/save-project", async (req, res) => {

    try {
        const data = req.body;
        console.log(data);
        const project = await projectCreation.create(data);
        console.log(project);
        res.status(201).send("data collected");
    } catch (error) {
        console.log(error);
    }
});

//get all projects from database
router.get("/get-projects", auth, async (req, res) => {
    let projects = await projectCreation.find({});
    res.json(projects);
});



module.exports = router;