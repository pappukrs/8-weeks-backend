const { Sequelize } = require("sequelize");
const env = require("./env");

const sequelize = new Sequelize(
  env.PG_DB,
  env.PG_USER,
  env.PG_PASS,
  {
    host: env.PG_HOST,
    port: env.PG_PORT,
    dialect: "postgres",
    logging: env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// Test the connection
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully via Sequelize');

    // Sync database (create tables if they don't exist)
    if (env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
    }
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
    throw error;
  }
};

module.exports = { sequelize, connectPostgres };
