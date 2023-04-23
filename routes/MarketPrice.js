require("dotenv").config();
require("../config/database");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const markerPrice = require("../model/marketPrice");

const app = express();

app.use(express.json());

//save project 
router.get("/get-market-prices", auth, async (req, res) => {
    try {
        const marketPrices = await markerPrice.find({});
        res.json(marketPrices);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;