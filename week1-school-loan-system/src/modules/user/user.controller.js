const service = require("./user.service");
const { success } = require("../../utils/response");

exports.createUser = async (req, res) =>
  success(res, await service.createUser(req.body), 201);

exports.getUser = async (req, res) =>
  success(res, await service.getUserById(req.params.id));
