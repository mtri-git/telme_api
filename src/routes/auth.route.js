const authController = require("../controllers/auth.controller");

module.exports = async function (fastify, opts) {
  fastify.post("/login", authController.login);
};