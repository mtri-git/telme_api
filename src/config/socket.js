const { Server } = require("socket.io");
const chalk = require("chalk");
const { createMessage } = require("../services/message.service");
const { getUserByEmail } = require("../services/user.service");

let io;
// key is userId, value is socket.id
const userSocketMap = new Map();

// key is socket.id, value is userId
const socketUserMap = new Map();

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
    console.log(chalk.bgYellow.whiteBright(`User connected: ${socket.id}`));

    // Đăng ký userId và ánh xạ với socket.id
    socket.on("register", async ({userId}) => {
      if (!userId) {
        console.warn(`User tried to register without an ID`);
        return;
      }

      // userId
      const user = await getUserByEmail(userId);

      userSocketMap.set(userId, socket.id);
      socketUserMap.set(socket.id, user);
      console.log(chalk.bgGreen.whiteBright(`User registered: ${userId} -> ${socket.id}`));
      console.table(userSocketMap);
      console.table(socketUserMap);
    });

    socket.on("test", (data) => {
      console.log("Test event received");
      console.log("🚀 ~ socket.on ~ data:", data)
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
          userId: socketUserMap.get(socket.id)?._id || "Unknown",
          message,
        });
        console.log(`Private message sent from ${socket.id} to ${recipientId}`);
      } else {
        console.warn(`Recipient ${recipientId} is not connected`);
      }
    });

    // Xử lý người dùng tham gia một nhóm
    socket.on("join_room", ({ roomId }) => {
      try {
        if (!roomId) {
          console.warn(`Invalid roomId`);
          return;
        }
  
        socket.join(roomId);
        // get key by value
        const userId = socketUserMap.get(socket.id)?._id || "Unknown"

        console.log(chalk.bgGreen(`${userId} joined room: ${roomId}`));
        
      } catch (error) {
        console.log("🚀 ~ socket.on ~ error:", error)
      }
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

    // Sự kiện typing
    socket.on("room_typing", ({ roomId, sender }) => {
      if (!roomId) {
        console.warn(`Invalid roomId`);
        return;
      }

      const userId = socketUserMap.get(socket.id)?._id || "Unknown"
      io.to(roomId).emit("user_room_typing", {
        senderId: socket.id,
        roomId,
        userId: userId,
        sender
      });
      console.log(`Typing event sent in ${roomId} by ${userId}`);
    })

    socket.on("stop_room_typing", ({ roomId, sender }) => {
      if (!roomId) {
        console.warn(`Invalid roomId`);
        return;
      }

      const userId = socketUserMap.get(socket.id)?._id || "Unknown"
      io.to(roomId).emit("user_stop_room_typing", {
        senderId: socket.id,
        roomId,
        userId: userId,
        sender
      });
      console.log(`Stop typing event sent in ${roomId} by ${userId}`);
    })

    // Xử lý tin nhắn nhóm
    socket.on("room_message", ({ roomId, message, sender }) => {
      if (!roomId || !message) {
        console.warn(`Invalid room message payload`);
        return;
      }

      console.log('socketUserMap')
      console.table(socketUserMap);
      
      const userId = socketUserMap.get(socket.id)?._id
      if (!userId) {
        console.warn(`User ${socket.id} is not registered`);
        return;
      }

      createMessage({ room: roomId, sender: userId, content: message });
      
      io.to(roomId).emit("receive_room_message", {
        senderId: socket.id,
        userId: userId,
        roomId,
        sender,
        message,
      });
      console.log(`Room message sent in ${roomId} by ${userId}`);
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
