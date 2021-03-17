const authService = require('../services/users.service');
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

        const isExists = authService.findUserByUsername(data.username);
        if (isExists) throw new Error("Username already exists");

        const newUser = await authService.register(data);
        let token = jwt.sign({
            data: { _id: newUser._id, role: newUser.role },
        }, process.env.SECRET_JWT_KEY, { expiresIn: '7d' });

        return res.json({ token, _id: newUser._id, role: newUser.role });

    } catch (err) {
        console.log(err);
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
        const user = await authService.signin(data);
        if (!user) throw new Error("User Not Exists");
        let token = jwt.sign({
            data: { _id: user._id, role: user.role },
        }, process.env.SECRET_JWT_KEY, { expiresIn: '7d' });

        return res.json({ token, _id: user._id, role: user.role });

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

module.exports = {
    register,
    signin,
}