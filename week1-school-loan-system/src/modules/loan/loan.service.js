const Loan = require("./loan.model");

exports.createLoan = (data) => Loan.create(data);
exports.getLoans = (userId, limit, offset) =>
  Loan.findAndCountAll({ where: { userId }, limit, offset });
exports.updateStatus = (id, status) =>
  Loan.update({ status }, { where: { id } });
