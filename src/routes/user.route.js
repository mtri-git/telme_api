const userController = require("../controllers/user.controller");

module.exports = async function (fastify, opts) {
  fastify.get("/", userController.getUsers);
  fastify.post("/", userController.createUser);
};
