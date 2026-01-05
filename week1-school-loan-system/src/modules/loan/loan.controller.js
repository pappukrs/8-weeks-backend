const service = require("./loan.service");
const { getPagination } = require("../../utils/pagination");

exports.createLoan = async (req, res) =>
  res.status(201).json(await service.createLoan(req.body));

exports.getLoans = async (req, res) => {
  const { limit, offset } = getPagination(req.query);
  res.json(await service.getLoans(req.query.userId, limit, offset));
};

exports.updateStatus = async (req, res) =>
  res.json(await service.updateStatus(req.params.id, req.body.status));
