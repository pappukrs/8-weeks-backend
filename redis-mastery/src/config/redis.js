const Redis = require("ioredis");
const config = require("./env.js");

const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis client connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis client connected and ready");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("close", () => {
  console.log("Redis connection closed");
});

redisClient.on("reconnecting", () => {
  console.log("Redis client reconnecting...");
});

redisClient.on("end", () => {
  console.log("Redis client disconnected");
});

// Monitor status
setInterval(() => {
  console.log("Redis client status:", redisClient.status);
}, 2000);



const shutDownRedis = async () => {

    try {
        console.log("\nShutting down Redis client...");
  await redisClient.quit();
  process.exit(0);
        
    } catch (error) {
        console.error("Error during Redis shutdown:", error);
        process.exit(1);
    }

}

process.on("SIGINT", shutDownRedis);
process.on("SIGTERM", shutDownRedis);

module.exports = redisClient;
