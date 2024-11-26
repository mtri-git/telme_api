const Room = require('../models/room.model');

/**
 * Tạo phòng mới
 * @param {Object} roomData - Dữ liệu tạo phòng
 * @returns {Object} - Thông tin phòng được tạo
 */
const createRoom = async (roomData) => {
  const room = new Room(roomData);
  return await room.save();
};

/**
 * Lấy danh sách phòng
 * @returns {Array} - Danh sách phòng
 */
const getAllRooms = async () => {
  return await Room.find().populate('users').populate('created_by').populate('admins');
};

/**
 * Lấy thông tin phòng theo ID
 * @param {String} roomId - ID phòng
 * @returns {Object} - Thông tin phòng
 */
const getRoomById = async (roomId) => {
  return await Room.findById(roomId).populate('users').populate('admins').populate('created_by');
};

/**
 * Thêm người dùng vào phòng
 * @param {String} roomId - ID phòng
 * @param {String} userId - ID người dùng
 * @returns {Object} - Thông tin phòng sau khi cập nhật
 */
const addUserToRoom = async (roomId, userId) => {
  return await Room.findByIdAndUpdate(
    roomId,
    { $addToSet: { users: userId } }, // Chỉ thêm nếu chưa tồn tại
    { new: true }
  ).populate('users').populate('admins').populate('created_by');
};

/**
 * Xóa phòng
 * @param {String} roomId - ID phòng
 * @returns {Object} - Thông tin phòng bị xóa mềm
 */
const deleteRoom = async (roomId) => {
  return await Room.findByIdAndUpdate(roomId, { deleted_at: new Date() }, { new: true });
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  addUserToRoom,
  deleteRoom,
};
