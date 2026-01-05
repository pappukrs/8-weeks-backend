// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  // MongoDB Configuration
  MONGO_URI: process.env.MONGO_URI || "mongodb://admin:password123@localhost:27017/school_loan_system?authSource=admin",

  // PostgreSQL Configuration
  PG_DB: process.env.PG_DB || "school_loan_system",
  PG_USER: process.env.PG_USER || "postgres",
  PG_PASS: process.env.PG_PASS || "password123",
  PG_HOST: process.env.PG_HOST || "localhost",
  PG_PORT: process.env.PG_PORT || 5432,

  // Redis Configuration
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",

  // Application Configuration
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,

  // Security
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",

  // CORS
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001",

  // Rate Limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,
};
