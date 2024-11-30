const messageController = require('../controllers/message.controller');
const { isAuth } = require("../middleware/auth.middleware");

module.exports = async (fastify) => {
  // Route gửi tin nhắn mới
  fastify.post('/', { preHandler: isAuth }, messageController.createMessage);

  // Route lấy tin nhắn trong một phòng
  fastify.get('/rooms/:roomId', { preHandler: isAuth }, messageController.getMessagesByRoom);

  // Route lấy tin nhắn cá nhân giữa 2 người dùng
  fastify.get('/private/:senderId/:recipientId', { preHandler: isAuth }, messageController.getPrivateMessages);

  // Route xóa tin nhắn
  fastify.delete('/:messageId', { preHandler: isAuth }, messageController.deleteMessage);
};
