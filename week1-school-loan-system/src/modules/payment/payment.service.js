const { sequelize } = require("../../config/postgres");
const Payment = require("./payment.model");

exports.createPayment = async (data) => {
  const t = await sequelize.transaction();
  try {
    const payment = await Payment.create(data, { transaction: t });
    await t.commit();
    return payment;
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

exports.getPayments = (loanId) =>
  Payment.findAll({ where: { loanId } });
