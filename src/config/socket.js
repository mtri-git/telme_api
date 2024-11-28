const { Server } = require("socket.io");

let io;
const userSocketMap = new Map();

// Cấu hình Socket.IO
const configureSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", process.env.HOME_URL],
      methods: ["GET", "POST"],
    },
  });

  // Sự kiện khi một client kết nối
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Đăng ký userId và ánh xạ với socket.id
    socket.on("register", ({userId}) => {
      if (!userId) {
        console.warn(`User tried to register without an ID`);
        return;
      }

      userSocketMap.set(userId, socket.id);
      console.log(`User registered: ${userId} -> ${socket.id}`);
      console.table(userSocketMap);
    });

    socket.on("test", () => {
      console.log("Test event received");
    });
    // Xử lý tin nhắn cá nhân
    socket.on("private_message", ({ recipientId, message }) => {
      if (!recipientId || !message) {
        console.warn(`Invalid private message payload`);
        return;
      }

      const recipientSocketId = userSocketMap.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_private_message", {
          senderId: socket.id,
          message,
        });
        console.log(`Private message sent from ${socket.id} to ${recipientId}`);
      } else {
        console.warn(`Recipient ${recipientId} is not connected`);
      }
    });

    // Xử lý người dùng tham gia một nhóm
    socket.on("join_room", ({ roomId }) => {
      if (!roomId) {
        console.warn(`Invalid roomId`);
        return;
      }

      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
    });

    // Xử lý người dùng rời khỏi một nhóm
    socket.on("leave_room", ({ roomId }) => {
      if (!roomId) {
        console.warn(`Invalid roomId`);
        return;
      }

      socket.leave(roomId);
      console.log(`${socket.id} left room: ${roomId}`);
    });

    // Xử lý tin nhắn nhóm
    socket.on("room_message", ({ roomId, message }) => {
      if (!roomId || !message) {
        console.warn(`Invalid room message payload`);
        return;
      }

      io.to(roomId).emit("receive_room_message", {
        senderId: socket.id,
        userId: userSocketMap.get(socket.id) || "Unknown",
        message,
      });
      console.log(`Room message sent in ${roomId} by ${socket.id}`);
    });

    // Xử lý ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Xóa userId khỏi map nếu socket.id đã bị ngắt kết nối
      for (const [userId, mappedSocketId] of userSocketMap.entries()) {
        if (mappedSocketId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`User ${userId} removed from map`);
          break;
        }
      }
    });
  });
};

// Hàm để lấy instance của `io` (dùng trong module khác nếu cần)
const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = { configureSocket, getIO };
