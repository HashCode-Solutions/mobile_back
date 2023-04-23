const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema({
    item:{type: String, default: null},
    current_price:{type: Number, default:null},
    item_image_url:{type: String, default: null},
    description:{type: String, default: null},
    pass_rates:{type: [Number], default:[]},
});

module.exports = mongoose.model("market_prices",marketPriceSchema);