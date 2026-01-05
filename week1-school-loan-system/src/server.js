require('dotenv').config();

const app = require("./app");
const connectMongo = require("./config/mongo");
const { sequelize, connectPostgres } = require("./config/postgres");
const env = require("./config/env");

const PORT = env.PORT;

const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectMongo();

    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await connectPostgres();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 Swagger docs available at: http://localhost:${PORT}/docs`);
      console.log(`🏥 Health check available at: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

startServer();
