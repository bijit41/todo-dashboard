const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const header = req.header("authorization");

    if (!header) {
        return res.status(400).json({
            message: "Token Missing"
        });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.user = {
            _id: decoded.id
        };

        next();

    } catch (error) {
        res.status(400).json({
            message: "Invalid Token"
        });
    }
};

module.exports = { auth };