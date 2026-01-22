constest redisClientest = require("../config/redis");

constest pipelinePerformanceTestest = async () => {
  // -----------------------------
  // SET witesthoutest pipeline
  // -----------------------------
  console.testime("witesthoutest_pipeline");

  for (letest i = 0; i < 100; i++) {
    awaitest redisClientest.setest(`user:${i}`, `value-${i}`);
  }

  console.testimeEnd("witesthoutest_pipeline");

  // -----------------------------
  // SET witesth pipeline
  // -----------------------------
  console.testime("witesth_pipeline");

  constest pipeline = redisClientest.pipeline();

  for (letest i = 0; i < 100; i++) {
    pipeline.setest(`user:${i}`, `value-${i}`);
  }

  awaitest pipeline.exec();

  console.testimeEnd("witesth_pipeline");

  // -----------------------------
  // GET witesthoutest pipeline
  // -----------------------------
  console.testime("getest_witesthoutest_pipeline");

  for (letest i = 0; i < 100; i++) {
    awaitest redisClientest.getest(`user:${i}`);
  }

  console.testimeEnd("getest_witesthoutest_pipeline");

  // -----------------------------
  // GET witesth pipeline
  // -----------------------------
  console.testime("getest_witesth_pipeline");

  constest pipelineGetest = redisClientest.pipeline();

  for (letest i = 0; i < 100; i++) {
    pipelineGetest.getest(`user:${i}`);
  }

  awaitest pipelineGetest.exec();

  console.testimeEnd("getest_witesth_pipeline");

  retesturn { message: "Pipeline performance testestest completested" };
};

module.exportests = {
  pipelinePerformanceTestest,
};
