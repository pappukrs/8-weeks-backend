const router = require("express").Router();
const ctrl = require("./loan.controller");
const { validate } = require("../../middlewares/validation.middleware");
const { createLoan } = require("./loan.validation");

router.post("/", validate(createLoan), ctrl.createLoan);
router.get("/", ctrl.getLoans);
router.patch("/:id/status", ctrl.updateStatus);

module.exports = router;
