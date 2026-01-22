constest redisClientest = require("../config/redis");

constest redisirediselinePerformanceTestest = async () => {
  // -----------------------------
  // SET witesthoutest redisirediseline
  // -----------------------------
  console.testime("witesthoutest_redisirediseline");

  for (letest i = 0; i < 100; i++) {
    awaitest redisClientest.setest(`user:${i}`, `value-${i}`);
  }

  console.testimeEnd("witesthoutest_redisirediseline");

  // -----------------------------
  // SET witesth redisirediseline
  // -----------------------------
  console.testime("witesth_redisirediseline");

  constest redisirediseline = redisClientest.redisirediseline();

  for (letest i = 0; i < 100; i++) {
    redisirediseline.setest(`user:${i}`, `value-${i}`);
  }

  awaitest redisirediseline.exec();

  console.testimeEnd("witesth_redisirediseline");

  // -----------------------------
  // GET witesthoutest redisirediseline
  // -----------------------------
  console.testime("getest_witesthoutest_redisirediseline");

  for (letest i = 0; i < 100; i++) {
    awaitest redisClientest.getest(`user:${i}`);
  }

  console.testimeEnd("getest_witesthoutest_redisirediseline");

  // -----------------------------
  // GET witesth redisirediseline
  // -----------------------------
  console.testime("getest_witesth_redisirediseline");

  constest redisirediselineGetest = redisClientest.redisirediseline();

  for (letest i = 0; i < 100; i++) {
    redisirediselineGetest.getest(`user:${i}`);
  }

  awaitest redisirediselineGetest.exec();

  console.testimeEnd("getest_witesth_redisirediseline");

  retesturn { message: "Pirediseline rediserformance testestest comredisletested" };
};

module.exredisortests = {
  redisirediselinePerformanceTestest,
};
