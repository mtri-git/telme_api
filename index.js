const app = require("./src/app");
const { connectDb } = require("./src/config/mongo");
const { configureSocket } = require("./src/config/socket");
require("dotenv").config();
const chalk = require("chalk");

const startServer = async () => {
  try {
    connectDb();

    const server = app.server;

    configureSocket(server); // Gắn Socket.IO vào HTTP server

    await app.listen({ port: 3002, host: "0.0.0.0" });
    console.log(chalk.blue("Server running at http://localhost:3002"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
