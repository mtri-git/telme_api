const messageService = require('../services/message.service');

/**
 * Tạo tin nhắn mới
 */
const createMessage = async (req, reply) => {
  try {
    const { content, sender, room, recipient } = req.body;
    const message = await messageService.createMessage({ content, sender, room, recipient });
    reply.code(201).send(message);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Lấy tất cả tin nhắn trong phòng
 */
const getMessagesByRoom = async (req, reply) => {
  try {
    const { roomId } = req.params;
    const messages = await messageService.getMessagesByRoom(roomId);
    reply.send(messages);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Lấy tin nhắn cá nhân giữa hai người dùng
 */
const getPrivateMessages = async (req, reply) => {
  try {
    const { senderId, recipientId } = req.params;
    const messages = await messageService.getPrivateMessages(senderId, recipientId);
    reply.send(messages);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Xóa tin nhắn
 */
const deleteMessage = async (req, reply) => {
  try {
    const { messageId } = req.params;
    const message = await messageService.deleteMessage(messageId);
    if (!message) {
      reply.code(404).send({ message: 'Message not found' });
      return;
    }
    reply.send({ message: 'Message deleted successfully', message });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessagesByRoom,
  getPrivateMessages,
  deleteMessage,
};
