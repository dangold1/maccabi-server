const userService = require('../services/users.service');
const validationService = require('../services/validation.service');
const jwt = require('jsonwebtoken');

/**
 * @param {Object} req.body.data
 * @returns { Token || String } New User || err.message
 */
const register = async (req, res) => {
    try {
        const { data } = req.body;
        const error = validationService.isCreateValid(data);
        if (error) throw new Error(error.message);

        let isExists = userService.findUserByEmail(data.email);
        if (isExists) throw new Error("Email already exists");

        isExists = userService.findUserByUsername(data.username);
        if (isExists) throw new Error("Username already exists");

        const newUser = await userService.register(data);
        let token = jwt.sign({
            data: { _id: newUser._id },
        }, process.env.SECRET_JWT_KEY, { expiresIn: '7d' });

        return res.json({ token, _id: newUser._id });

    } catch (err) {
        res.status(400).send(err.message);
    }
}

/**
 * @param {Object} req.body
 * @returns {Token} || err.message
 */
const signin = async (req, res) => {
    try {
        const { data } = req.body;
        const user = await userService.signin(data);
        if (!user) throw new Error("User Not Exists");
        let token = jwt.sign({
            data: { _id: user._id },
        }, process.env.SECRET_JWT_KEY, { expiresIn: '7d' });
        const { password, ...logedUser } = user;
        logedUser.token = token;
        return res.json(logedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

/**
 * @param {token} req.query
 * @returns {User} || err.message
 */
const loadUserFromToken = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) throw new Error("No token provided");
        jwt.verify(token, process.env.SECRET_JWT_KEY, async (err, jwtData) => {
            if (err) throw new Error("Token is not valid");
            const userID = jwtData?.data?._id;
            if (!userID) throw new Error("Token is not valid");
            const user = await userService.findUserById(userID);
            if (!user) throw new Error("User not found");
            const { password, ...logedUser } = user;
            return res.json(logedUser);
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    register,
    signin,
    loadUserFromToken,
}