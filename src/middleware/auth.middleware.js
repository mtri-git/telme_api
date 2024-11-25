const { verifyToken } = require("../utils/token");

const isAuth = async (request, reply) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }

    // Xác thực token
    const decoded = verifyToken(token, 'access');
    request.user = decoded; // Gắn thông tin user vào request để sử dụng trong các route
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = {
  isAuth,
};
