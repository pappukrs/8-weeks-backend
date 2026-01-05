const Joi = require("joi");
exports.createLoan = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().required(),
});
