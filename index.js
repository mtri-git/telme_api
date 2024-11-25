const app = require('./src/app');
const { connectDb } = require('./src/config/mongo');

const startServer = async () => {
  try {
    connectDb();
    await app.listen({ port: 3002, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3002');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
