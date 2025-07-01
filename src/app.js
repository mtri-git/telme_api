const fastify = require("fastify")({ logger: true });
const registerRoutes = require("./routes/router");
const cors = require("@fastify/cors");
require("dotenv").config();
const chalk = require("chalk");

fastify.register(cors, {
  origin: (origin, callback) => {
    console.log(`Request origin: ${origin}`);
    const allowedOrigins = [process.env.HOME_URL, "https://telme.vercel.app", "http://localhost:3005/"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(chalk.red(`Origin not allowed: ${origin}`));
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
