const Users = require('../database/users');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
/**
 * @param {string} username
 * @returns {Object || NULL} User || NULL
 */
const findUserByUsername = username => Users.find(u => u.username === username);


/**
 * @param {uuid} id 
 * @returns {Object || NULL} User || NULL
 */
const findUserById = async userId => Users.find(u => u._id === userId);

/**
 * @returns {[user]} Users
 */
const getAllUsers = () => Users.map(u => {
    const { password, _id, token, ...user } = u;
    user.id = _id;
    return user;
});


/**
 * @param {Object} userData { username, password, age }
 * @returns {Object} new User
 */
const register = async userData => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        let newUser = { _id: uuidv4(), ...userData };
        Users.push(newUser);
        return newUser;
    } catch (err) {
        throw new Error(`User Not created, ${err.message}`);
    }
}

/**
 * @param {Object} data { username, password }
 * @returns {Object || NULL} User || NULL
 */
const signin = async data => {
    try {
        const { username, password } = data;
        const user = findUserByUsername(username);
        if (user) {
            const success = await bcrypt.compare(password, user.password);
            if (success) return user;
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    register,
    findUserById,
    signin,
    getAllUsers,
    findUserByUsername,
}