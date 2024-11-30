const roomController = require('../controllers/room.controller');
const { isAuth } = require("../middleware/auth.middleware");

module.exports = async (fastify) => {
  fastify.post('/', { preHandler: isAuth },  roomController.createRoom);
  fastify.get('/', roomController.getAllRooms);
  fastify.get('/for-user', { preHandler: isAuth }, roomController.getRoomForUser);
  fastify.get('/:roomId', { preHandler: isAuth }, roomController.getRoomById);
  fastify.post('/:roomId/users', { preHandler: isAuth }, roomController.addUserToRoom);
  fastify.delete('/:roomId', { preHandler: isAuth }, roomController.deleteRoom);
};
