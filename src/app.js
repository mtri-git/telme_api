const fastify = require("fastify")({ logger: true });
const registerRoutes = require("./routes/router");
const cors = require("@fastify/cors");
require("dotenv").config();
const chalk = require("chalk");

fastify.register(cors, {
  origin: ["http://localhost:3005", process.env.HOME_URL || "https://telme-api.onrender.com"], // Các domain được phép truy cập
  methods: ["GET", "POST", "PUT", "DELETE"], // Các method HTTP được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
  credentials: true, // Hỗ trợ gửi cookie (cross-site)
});
registerRoutes(fastify);

console.log(chalk.yellowBright("Home URL: ", process.env.HOME_URL));

module.exports = fastify;
