const fastify = require("fastify")({ logger: true });
const registerRoutes = require("./routes/router");
const cors = require("@fastify/cors");
require("dotenv").config();
const chalk = require("chalk");

fastify.register(cors, {
  origin: (origin, callback) => {
    console.log(`Request origin: ${origin}`);
    const allowedOrigin = process.env.HOME_URL
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.error(`Origin not allowed: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Các method HTTP được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
  credentials: true, // Hỗ trợ gửi cookie (cross-site)
});
registerRoutes(fastify);

console.log(chalk.yellowBright("Home URL: ", process.env.HOME_URL));

module.exports = fastify;
