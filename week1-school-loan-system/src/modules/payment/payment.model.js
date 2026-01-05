const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");

module.exports = sequelize.define("Payment", {
  loanId: DataTypes.INTEGER,
  amount: DataTypes.FLOAT,
});
