const Joi = require("joi");
exports.createPayment = Joi.object({
  loanId: Joi.number().required(),
  amount: Joi.number().required(),
});
