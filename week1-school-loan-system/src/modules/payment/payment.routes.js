const router = require("express").Router();
const ctrl = require("./payment.controller");
const { validate } = require("../../middlewares/validation.middleware");
const { createPayment } = require("./payment.validation");

router.post("/", validate(createPayment), ctrl.createPayment);
router.get("/", ctrl.getPayments);

module.exports = router;
