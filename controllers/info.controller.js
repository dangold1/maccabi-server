const usersService = require('../services/users.service');

/**
 * @returns {Object[]} Users
 */
const exportsUsers = (req, res) => {
    const users = usersService.getAllUsers();
    res.json(users);
}

module.exports = {
    exportsUsers,
}