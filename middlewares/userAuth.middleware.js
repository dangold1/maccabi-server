const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

/**
 * 
 * Token Authentication Middleware
 * @param {String} req.headers['x-token']
 */
const userAuthMiddleware = async (req, res, next) => {
    try {
        let token = req.headers['x-token'];
        if (!token) throw new Error("No token provided");
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        const userId = decoded.data._id;
        const user = await authService.findUserById(userId);
        if (!user) throw new Error("User Not Exists");
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = userAuthMiddleware;