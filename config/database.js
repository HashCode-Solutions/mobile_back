const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

exports.connect = () => {

    mongoose.set("strictQuery", true);

    //connecting to the database
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Successfully connected to database");
    })
    .catch((error)=>{
        console.log(error);
        console.error(error);
        process.exit(1);
    });
}