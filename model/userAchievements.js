const mongoose = require("mongoose");

const userAchievemtSchema = new mongoose.Schema({
    userId:{type: String, default: null},
    achievements:{type: [Object], default:[]},
});

module.exports = mongoose.model("user_achievements",userAchievemtSchema);