const Message = require('../models/message.model');
const { successResponse } = require('../utils/response');

/**
 * Tạo một tin nhắn mới
 * @param {Object} messageData - Dữ liệu tin nhắn
 * @returns {Object} - Tin nhắn đã được tạo
 */
const createMessage = async (messageData) => {
  const message = new Message(messageData);
  return await message.save();
};

/**
 * Lấy tất cả tin nhắn trong phòng
 * @param {String} roomId - ID của phòng
 * @returns {Array} - Danh sách tin nhắn trong phòng
 */
const getMessagesByRoom = async (roomId) => {
  const messages = await Message.find({ room: roomId }).populate('sender').populate('room');
  return successResponse('Get messages success', messages);
};

/**
 * Lấy tin nhắn cá nhân giữa hai người dùng
 * @param {String} senderId - ID người gửi
 * @param {String} recipientId - ID người nhận
 * @returns {Array} - Danh sách tin nhắn cá nhân
 */
const getPrivateMessages = async (senderId, recipientId) => {
  const messages =  await Message.find({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  }).populate('sender').populate('recipient');

  return successResponse('Get private messages success', messages);
};

/**
 * Xóa tin nhắn
 * @param {String} messageId - ID của tin nhắn
 * @returns {Object} - Tin nhắn đã xóa
 */
const deleteMessage = async (messageId) => {
  const message = await Message.findByIdAndDelete(messageId);
  return successResponse('Delete message success', message);
};

module.exports = {
  createMessage,
  getMessagesByRoom,
  getPrivateMessages,
  deleteMessage,
};
