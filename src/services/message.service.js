const Message = require("../models/message.model");
const Room = require("../models/room.model");
const User = require("../models/user.model");
const { successResponse } = require("../utils/response");

/**
 * Tạo một tin nhắn mới
 * @param {Object} messageData - Dữ liệu tin nhắn
 * @returns {Object} - Tin nhắn đã được tạo
 */
const createMessage = async (messageData) => {
  console.log("New message:", messageData);
  const message = new Message(messageData);
  await message.save();

  const sender = await User.findOne({ _id: messageData.sender }).select("fullname email avatar").lean();
  console.log("🚀 ~ createMessage ~ sender:", sender)
  messageData.sender = sender;

  await Room.findByIdAndUpdate(messageData.room, {
    last_message: messageData,
  });

  return successResponse("Create message success", message);
};

/**
 * Lấy tất cả tin nhắn trong phòng
 * @param {String} roomId - ID của phòng
 * @returns {Array} - Danh sách tin nhắn trong phòng
 */
const getMessagesByRoom = async (data) => {
  const { roomId, limit = 10, page = 1, userId } = data;
  console.log("🚀 ~ getMessagesByRoom ~ userId:", userId)
  const total = await Message.countDocuments({ room: roomId });
  const messages = await Message.find({ room: roomId, deleted_at: null })
    .populate("sender")
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ created_at: -1 })
    .lean();

  for (const message of messages) {
    message.is_sender = message.sender._id.toString() === userId;
  }

  return successResponse("Get messages success", messages, { meta_data: { total, limit, page } });
};

/**
 * Lấy tin nhắn cá nhân giữa hai người dùng
 * @param {String} senderId - ID người gửi
 * @param {String} recipientId - ID người nhận
 * @returns {Array} - Danh sách tin nhắn cá nhân
 */
const getPrivateMessages = async (senderId, recipientId) => {
  const messages = await Message.find({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  })
    .populate("sender")
    .populate("recipient");

  return successResponse("Get private messages success", messages);
};

/**
 * Xóa tin nhắn
 * @param {String} messageId - ID của tin nhắn
 * @returns {Object} - Tin nhắn đã xóa
 */
const deleteMessage = async (messageId) => {
  const message = await Message.findByIdAndDelete(messageId);
  return successResponse("Delete message success", message);
};

module.exports = {
  createMessage,
  getMessagesByRoom,
  getPrivateMessages,
  deleteMessage,
};
