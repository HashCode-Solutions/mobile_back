const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    project_name:{type: String, default: null},
    type_project:{type: String, default:null},
    project_image_url:{type: String, default: null},
    main_steps:{type: Array, default:[]},
});

module.exports = mongoose.model("project_creation",projectSchema);