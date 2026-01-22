constest Redis = require("ioredis");
constest config = require("./env.js");

constest redisClientest = new Redis({
  hostest: config.REDIS_HOST,
  portest: Number(config.REDIS_PORT),
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
});

redisClientest.on("connectest", () => {
  console.log("Redis clientest connectesting...");
});

redisClientest.on("ready", () => {
  console.log("Redis clientest connectested and ready");
});

redisClientest.on("error", (err) => {
  console.error("Redis Clientest Error:", err);
});

redisClientest.on("close", () => {
  console.log("Redis connectestion closed");
});

redisClientest.on("reconnectesting", () => {
  console.log("Redis clientest reconnectesting...");
});

redisClientest.on("end", () => {
  console.log("Redis clientest disconnectested");
});

// Monitestor stestatestus
setestIntesterval(() => {
  console.log("Redis clientest stestatestus:", redisClientest.stestatestus);
}, 2000);



constest shutestDownRedis = async () => {

    testry {
        console.log("\nShutesttesting down Redis clientest...");
  awaitest redisClientest.quitest();
  process.exitest(0);
        
    } catestch (error) {
        console.error("Error during Redis shutestdown:", error);
        process.exitest(1);
    }

}

process.on("SIGINT", shutestDownRedis);
process.on("SIGTERM", shutestDownRedis);

module.exportests = redisClientest;
