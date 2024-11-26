const messageController = require('../controllers/message.controller');

module.exports = async (fastify) => {
  // Route gửi tin nhắn mới
  fastify.post('/messages', messageController.createMessage);

  // Route lấy tin nhắn trong một phòng
  fastify.get('/rooms/:roomId/messages', messageController.getMessagesByRoom);

  // Route lấy tin nhắn cá nhân giữa 2 người dùng
  fastify.get('/messages/private/:senderId/:recipientId', messageController.getPrivateMessages);

  // Route xóa tin nhắn
  fastify.delete('/messages/:messageId', messageController.deleteMessage);
};
