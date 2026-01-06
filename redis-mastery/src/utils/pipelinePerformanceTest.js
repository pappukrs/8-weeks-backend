const redisClient = require("../config/redis");

const pipelinePerformanceTest = async () => {
  // -----------------------------
  // SET without pipeline
  // -----------------------------
  console.time("without_pipeline");

  for (let i = 0; i < 100; i++) {
    await redisClient.set(`user:${i}`, `value-${i}`);
  }

  console.timeEnd("without_pipeline");

  // -----------------------------
  // SET with pipeline
  // -----------------------------
  console.time("with_pipeline");

  const pipeline = redisClient.pipeline();

  for (let i = 0; i < 100; i++) {
    pipeline.set(`user:${i}`, `value-${i}`);
  }

  await pipeline.exec();

  console.timeEnd("with_pipeline");

  // -----------------------------
  // GET without pipeline
  // -----------------------------
  console.time("get_without_pipeline");

  for (let i = 0; i < 100; i++) {
    await redisClient.get(`user:${i}`);
  }

  console.timeEnd("get_without_pipeline");

  // -----------------------------
  // GET with pipeline
  // -----------------------------
  console.time("get_with_pipeline");

  const pipelineGet = redisClient.pipeline();

  for (let i = 0; i < 100; i++) {
    pipelineGet.get(`user:${i}`);
  }

  await pipelineGet.exec();

  console.timeEnd("get_with_pipeline");

  return { message: "Pipeline performance test completed" };
};

module.exports = {
  pipelinePerformanceTest,
};
