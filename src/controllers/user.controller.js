const userService = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const response = await userService.createUser();
        res.send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getUsers,
    createUser
}