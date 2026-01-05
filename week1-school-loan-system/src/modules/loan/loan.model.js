const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");

module.exports = sequelize.define("Loan", {
  userId: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: "active" },
});
