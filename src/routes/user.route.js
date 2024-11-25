const userController = require("../controllers/user.controller");
const { isAuth } = require("../middleware/auth.middleware");

module.exports = async function (fastify, opts) {
  fastify.get("/", userController.getUsers);
  fastify.post("/", userController.createUser);
  fastify.post("/register", userController.registerUser);
  
  // Sử dụng middleware `isAuth` cho route `/me`
  fastify.get("/me", { preHandler: isAuth }, userController.getUserInfo);
};
