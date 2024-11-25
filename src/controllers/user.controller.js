const userService = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const data = {
            limit: req.query.limit || 10,
            page: req.query.page || 1
        }

        const users = await userService.getUsers(data);
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

const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const response = await userService.registerUser(data);
        res.send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const data = {};
        data.id = req.user.id;
        const response = await userService.getUserInfo(data);
        res.send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getUsers,
    createUser,
    registerUser,
    getUserInfo
}