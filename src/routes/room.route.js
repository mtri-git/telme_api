const roomController = require('../controllers/room.controller');

module.exports = async (fastify) => {
  fastify.post('/', roomController.createRoom); // Tạo phòng mới
  fastify.get('/', roomController.getAllRooms); // Lấy danh sách phòng
  fastify.get('/:roomId', roomController.getRoomById); // Lấy thông tin phòng theo ID
  fastify.post('/:roomId/users', roomController.addUserToRoom); // Thêm user vào phòng
  fastify.delete('/:roomId', roomController.deleteRoom); // Xóa phòng (soft delete)
};
