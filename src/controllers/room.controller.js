const roomService = require('../services/room.service');

/**
 * Tạo phòng mới
 */
const createRoom = async (req, reply) => {
  try {
    const data = req.body;
    data.created_by = req.user.id;
    data.admins = [req.user.id];
    data.users = [req.user.id, ...data.users];
    data.userId = req.user.id;
    const room = await roomService.createRoom(req.body);
    reply.code(201).send(room);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Lấy danh sách phòng
 */
const getAllRooms = async (req, reply) => {
  try {
    const data = req.query;
    const rooms = await roomService.getAllRooms(data);
    reply.send(rooms);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Lấy danh sách phòng
 */
const getRoomForUser = async (req, reply) => {
  try {
    const data = req.query;
    data.userId = req.user.id;
    const rooms = await roomService.getRoomForUser(data);
    reply.send(rooms);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Lấy thông tin phòng theo ID
 */
const getRoomById = async (req, reply) => {
  try {
    const room = await roomService.getRoomById(req.params.roomId);
    if (!room) {
      reply.code(404).send({ message: 'Room not found' });
      return;
    }
    reply.send(room);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Thêm người dùng vào phòng
 */
const addUserToRoom = async (req, reply) => {
  try {
    const room = await roomService.addUserToRoom(req.params.roomId, req.body.userId);
    if (!room) {
      reply.code(404).send({ message: 'Room not found' });
      return;
    }
    reply.send(room);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

/**
 * Xóa phòng (soft delete)
 */
const deleteRoom = async (req, reply) => {
  try {
    const room = await roomService.deleteRoom(req.params.roomId);
    if (!room) {
      reply.code(404).send({ message: 'Room not found' });
      return;
    }
    reply.send({ message: 'Room deleted successfully', room });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomForUser,
  getRoomById,
  addUserToRoom,
  deleteRoom,
};
