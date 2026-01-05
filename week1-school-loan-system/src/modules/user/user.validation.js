const Joi = require("joi");
exports.createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
