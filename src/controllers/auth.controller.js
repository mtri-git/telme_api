const authService = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const data = req.body;

        const result = await authService.login(data);
        return res.send(result);
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    login
}