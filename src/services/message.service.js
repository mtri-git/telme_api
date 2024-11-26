const Message = require('../models/message.model');
const Room = require('../models/room.model');

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
  return await Message.find({ room: roomId }).populate('sender').populate('room');
};

/**
 * Lấy tin nhắn cá nhân giữa hai người dùng
 * @param {String} senderId - ID người gửi
 * @param {String} recipientId - ID người nhận
 * @returns {Array} - Danh sách tin nhắn cá nhân
 */
const getPrivateMessages = async (senderId, recipientId) => {
  return await Message.find({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  }).populate('sender').populate('recipient');
};

/**
 * Xóa tin nhắn
 * @param {String} messageId - ID của tin nhắn
 * @returns {Object} - Tin nhắn đã xóa
 */
const deleteMessage = async (messageId) => {
  return await Message.findByIdAndDelete(messageId);
};

module.exports = {
  createMessage,
  getMessagesByRoom,
  getPrivateMessages,
  deleteMessage,
};
