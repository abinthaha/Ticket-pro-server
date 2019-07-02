const jwt = require('jsonwebtoken');
const keys = require('../config/key');

module.exports = function (req, res, next) {
    // Get the token from the header

    const token = req.header('authorization');

    // Check if no token

    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        })
    }

    try {
        const decoded = jwt.verify(token, keys.secretOrKey)
        req.decoded = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
}