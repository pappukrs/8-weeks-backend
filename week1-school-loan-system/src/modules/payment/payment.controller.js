const service = require("./payment.service");

exports.createPayment = async (req, res) =>
  res.status(201).json(await service.createPayment(req.body));

exports.getPayments = async (req, res) =>
  res.json(await service.getPayments(req.query.loanId));
