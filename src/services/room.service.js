const Room = require("../models/room.model");
const { successResponse } = require("../utils/response");

/**
 * Tạo phòng mới
 * @param {Object} data - Dữ liệu tạo phòng
 * @returns {Object} - Thông tin phòng được tạo
 */
const createRoom = async (data) => {
  data.users = [ ...new Set(data.users) ];
  data.admins = [ ...new Set(data.admins) ];
  const room = new Room(data);
  await room.save();
  return successResponse("Create room success", room);
};

/**
 * Lấy danh sách phòng
 * @returns {Array} - Danh sách phòng
 */
const getAllRooms = async (data) => {
  const { limit = 10, page = 1 } = data;
  const rooms = await Room.find()
    .populate("users")
    .populate("created_by")
    .populate("admins")
    .skip((page - 1) * limit)
    .limit(limit);
  return successResponse("Get rooms success", rooms);
};

const getRoomForUser = async (data) => {
  const { userId } = data;
  const rooms = await Room.find({ users: userId })
    .populate("users")
    // .populate("created_by")
    // .populate("admins");
  return successResponse("Get rooms success", rooms);
}

/**
 * Lấy thông tin phòng theo ID
 * @param {String} roomId - ID phòng
 * @returns {Object} - Thông tin phòng
 */
const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId)
    .populate("users")
    .populate("admins")
    .populate("created_by");

  return successResponse("Get room success", room);
};

/**
 * Thêm người dùng vào phòng
 * @param {String} roomId - ID phòng
 * @param {String} userId - ID người dùng
 * @returns {Object} - Thông tin phòng sau khi cập nhật
 */
const addUserToRoom = async (roomId, userId) => {
  const response = await Room.findByIdAndUpdate(
    roomId,
    { $addToSet: { users: userId } }, // Chỉ thêm nếu chưa tồn tại
    { new: true }
  )
    .populate("users")
    .populate("admins")
    .populate("created_by");

    return successResponse("Add user to room success", response);
};

/**
 * Xóa phòng
 * @param {String} roomId - ID phòng
 * @returns {Object} - Thông tin phòng bị xóa mềm
 */
const deleteRoom = async (roomId) => {
  const room = await Room.findByIdAndUpdate(
    roomId,
    { deleted_at: new Date() },
    { new: true }
  );

  return successResponse("Delete room success", room);
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomForUser,
  getRoomById,
  addUserToRoom,
  deleteRoom,
};
