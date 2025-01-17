const Room = require("../models/room.model");
const Users = require("../models/user.model");
const { successResponse } = require("../utils/response");

/**
 * Tạo phòng mới
 * @param {Object} data - Dữ liệu tạo phòng
 * @returns {Object} - Thông tin phòng được tạo
 */
const createRoom = async (data) => {
  const { userId } = data;
  const users = await Users.find({ email: { $in: data.userEmails } });

  const dataImport = {
    name: data.name,
    users: users.map((user) => user._id),
    admins: [...new Set(data.admins)],
    created_by: userId,
  };
  const room = new Room(dataImport);
  await room.save();
  return successResponse("Create room success", room);
};

/**
 * Lấy danh sách phòng
 * @returns {Array} - Danh sách phòng
 */
const getAllRooms = async (data) => {
  const { limit = 20, page = 1, userId, name } = data;
  const query = {
    deleted_at: null,
  };

  if (name) {
    query.name = { $regex: new RegExp(name, "i") };
  }
  const rooms = await Room.find(query)
    .populate("users")
    .populate("created_by")
    .populate("admins")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ created_at: -1 })
    .lean();

  for (const room of rooms) {
    room.is_admin = room.admins.includes(userId);
    room.is_member = room.users.some((user) => user._id.toString() === userId);
    room.is_creator = room.created_by._id.toString() === userId;
  }

  return successResponse("Get rooms success", rooms);
};

const getRoomForUser = async (data) => {
  const { userId } = data;
  const rooms = await Room.find({ users: userId })
    .populate("users")
    .sort({ updated_at: -1 });
  // .populate("created_by")
  // .populate("admins");
  return successResponse("Get rooms success", rooms);
};

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

/**
 * Xóa phòng
 * @param {String} data
 * @returns {Object} - Thông tin phòng bị xóa mềm
 */
const joinRoom = async (data) => {
  const { roomId, userId } = data;

  const room = await Room.findByIdAndUpdate(
    roomId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .populate("users")
    .populate("admins")
    .populate("created_by");

  return successResponse("Delete room success", room);
};

/**
 * Xóa phòng
 * @param {String} data
 * @returns {Object} - Thông tin phòng bị xóa mềm
 */
const leaveRoom = async (data) => {
  const { roomId, userId } = data;

  const room = await Room.findByIdAndUpdate(
    roomId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users")
    .populate("admins")
    .populate("created_by");

  return successResponse("Delete room success", room);
};



module.exports = {
  createRoom,
  getAllRooms,
  getRoomForUser,
  getRoomById,
  addUserToRoom,
  deleteRoom,
  joinRoom,
  leaveRoom
};
