const fastify = require("fastify")({ logger: true });
const registerRoutes = require("./routes/router");
const cors = require("@fastify/cors");

const homeUrl = process.env.HOME_URL || "http://localhost:3005";

fastify.register(cors, {
  origin: ["http://localhost:3005", homeUrl], // Các domain được phép truy cập
  methods: ["GET", "POST", "PUT", "DELETE"], // Các method HTTP được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
  credentials: true, // Hỗ trợ gửi cookie (cross-site)
});
registerRoutes(fastify);

module.exports = fastify;
