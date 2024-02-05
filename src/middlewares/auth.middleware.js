const jwt = require("jsonwebtoken");

exports.check_token = async (req, res, next) => {
    try {
        req.user = jwt.verify(req.headers.authorization, "key");
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized User" });
    }
}