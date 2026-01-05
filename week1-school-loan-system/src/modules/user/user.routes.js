const router = require("express").Router();
const ctrl = require("./user.controller");
const { validate } = require("../../middlewares/validation.middleware");
const { createUser } = require("./user.validation");

router.post("/", validate(createUser), ctrl.createUser);
router.get("/:id", ctrl.getUser);

module.exports = router;
