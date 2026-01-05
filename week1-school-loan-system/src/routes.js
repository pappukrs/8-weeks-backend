const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const loanRoutes = require('./modules/loan/loan.routes');
const paymentRoutes = require('./modules/payment/payment.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/loans', loanRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
