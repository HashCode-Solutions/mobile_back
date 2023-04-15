const jwt = require("jsonwebtoken");
const CustomObject = require('../dto/CustomObject');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    let customObject = new CustomObject("");
    if (!token) {
        customObject.Message = "A token is required for authentication";
        return res.status(403).json(customObject);
    }
    try {
        customObject.Message = "Invalid Token";
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded; 
    } catch (error) {
        return res.status(401).json(customObject);
    }
    return next();
};

module.exports = verifyToken;