const redisClient = require("../../config/redis");
const crypto = require("crypto");
const { pipelinePerformanceTest } = require("../../utils/pipelinePerformanceTest");


const exerciseServiceOne = async () => {
  // 1️⃣ Total visits counter
  const visitorCount = await redisClient.incr("visits:total");

  // 2️⃣ Generate OTP
  const otpToken = Math.floor(100000 + Math.random() * 900000);
  const otpKey = `otp:${otpToken}`;

  // 3️⃣ Store OTP with 30s expiry
  await redisClient.set(otpKey, otpToken, "EX", 30);

  // 4️⃣ Check TTL
  const ttl = await redisClient.ttl(otpKey);
  console.log("OTP TTL (seconds):", ttl);

  // 5️⃣ Persist OTP (remove expiry)
  await redisClient.persist(otpKey);

  // 6️⃣ Track recent OTPs (LIST)
  await redisClient.lpush("recent_otps", otpToken);
  await redisClient.ltrim("recent_otps", 0, 4);

  const recentOtps = await redisClient.lrange("recent_otps", 0, -1);
  console.log("Recent OTPs:", recentOtps);

  console.log("Total Page Visits:", visitorCount);

  return { visitorCount , otpToken, ttl, recentOtps };
};

const exerciseServiceTwo = async () => {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;

  const sessionData = {
    userId: "42",
    userName: "demo",
    userEmail: "demo@test.com",
    userRole: "user",
    userStatus: "active",
    userCreatedAt: new Date().toISOString(),
    userUpdatedAt: new Date().toISOString(),
  };

  // 1️⃣ Create session hash
  await redisClient.hset(sessionKey, sessionData);

  // 2️⃣ Set session expiry (30 minutes)
  await redisClient.expire(sessionKey, 1800);

  const getUserName = await redisClient.hget(sessionKey, "userName");
  const getSessionData = await redisClient.hgetall(sessionKey);

  await redisClient.hdel(sessionKey, "userRole");
  const getnewSessionData = await redisClient.hgetall(sessionKey);

  const isUserRoleExists = await redisClient.hexists(sessionKey, "userRole");

  return {
    getUserName,
    getSessionData,
    getnewSessionData,
    isUserRoleExists,
  };
};


const exerciseServiceThree = async () => {
  const queueKey = "queue:email_jobs";

  const jobs = [
    { jobId: "1", status: "pending" },
    { jobId: "2", status: "paid" },
    { jobId: "3", status: "completed" },
    { jobId: "4", status: "failed" },
    { jobId: "5", status: "in_progress" },
  ];

  // 1️⃣ Push 5 jobs
  for (const job of jobs) {
    await redisClient.lpush(queueKey, JSON.stringify(job));
  }

  // 2️⃣ Check queue length
  const jobLength = await redisClient.llen(queueKey);
  console.log("Queue length:", jobLength);

  // 3️⃣ Pop jobs one-by-one (worker simulation)
  let job;
  const processedJobs = [];

  while ((job = await redisClient.rpop(queueKey))) {
    processedJobs.push(JSON.parse(job));
  }

  // 4️⃣ Read remaining jobs
  const remainingJobs = await redisClient.lrange(queueKey, 0, -1);

  return {
    jobLength,
    processedJobs,
    remainingJobs,
  };
};



const exerciseServiceFour = async () => {
  const userId = crypto.randomUUID();
  const usersSetKey = "users:logged_in"; // 🔑 ONE SET

  // 1️⃣ Add user ID to set (duplicates automatically ignored)
  await redisClient.sadd(usersSetKey, userId);

  // 2️⃣ Count unique users
  const userCount = await redisClient.scard(usersSetKey);
  console.log("Unique User Count:", userCount);

  // 3️⃣ Check membership
  const userExists = await redisClient.sismember(usersSetKey, userId);
  console.log("User Exists:", userExists);

  // 4️⃣ Get all users
  const allUsers = await redisClient.smembers(usersSetKey);
  console.log("All Users:", allUsers);

  return { userCount, userExists, allUsers };
};

const exerciseServiceFive = async (userId) => {
  const rateKey = `rate:user:${userId}`;
  const maxRequests = 5;
  const windowMs = 60 * 1000;
  const now = Date.now();

  // 1️⃣ Add current request
  await redisClient.zadd(rateKey, now, `${now}`);

  // 2️⃣ Remove requests outside window
  await redisClient.zremrangebyscore(
    rateKey,
    0,
    now - windowMs
  );

  // 3️⃣ Count requests in window
  const requestCount = await redisClient.zcard(rateKey);

  // 4️⃣ Set expiry (only once)
  await redisClient.expire(rateKey, 60);

  // 5️⃣ Check limit
  const remainingRequests = Math.max(
    maxRequests - requestCount,
    0
  );

  const allowed = requestCount <= maxRequests;

  return {
    allowed,
    requestCount,
    remainingRequests,
  };
};


const exerciseServiceSix = async () => {
  const publisher = redisClient.duplicate();
  const subscriber = redisClient.duplicate();

  await subscriber.subscribe("notifications");

  subscriber.on("message", (channel, message) => {
    console.log("Received:", JSON.parse(message));
  });

  await publisher.publish(
    "notifications",
    JSON.stringify({
      type: "INFO",
      message: "Hello from publisher",
      ts: Date.now(),
    })
  );

  setTimeout(async () => {
    await publisher.quit();
    await subscriber.quit();
  }, 1000);

  return { message: "Pub/Sub test completed" };
};


const exerciseServiceSeven = async () => {
  await redisClient.set("balance:A", 1000);
  await redisClient.set("balance:B", 0);
  const result = await redisClient.multi()
  .decrby("balance:A", 100)
  .incrby("balance:B", 100)
  .exec();
  console.log(result);

  const balanceA = await redisClient.get("balance:A");
  const balanceB = await redisClient.get("balance:B");
  console.log("Balance A:", balanceA);
  console.log("Balance B:", balanceB);
  return { balanceA, balanceB, result };
}


const exerciseServiceEight = async () => {
  
    try {
      const result = await pipelinePerformanceTest();
      return result;
    } catch (err) {
      console.error(err);
      return { error: "Pipeline test failed" };
    }
  
}

const exerciseServiceNine = async () => {

  redisClient.defineCommand("incrWithTtl", {
    numberOfKeys: 1,
    lua: `
      if redis.call("EXISTS", KEYS[1]) == 1 then
        return redis.call("INCR", KEYS[1])
      else
        redis.call("SET", KEYS[1], 1, "EX", ARGV[1])
        return 1
      end
    `,
  });
  
  const count = await redisClient.incrWithTtl("hits", 60);
  
  return { count };
}


const exerciseServiceTen = async () => {
  const stream = "orders:stream";
  const group = "order-service";
  const consumer = "worker-1";

  // Producer
  await redisClient.xadd(stream, "*", "orderId", "101", "status", "CREATED");
  await redisClient.xadd(stream, "*", "orderId", "102", "status", "PAID");

  // Create group (idempotent)
  try {
    await redisClient.xgroup("CREATE", stream, group, "$", "MKSTREAM");
  } catch (err) {
    if (!err.message.includes("BUSYGROUP")) throw err;
  }

  // Consumer read
  const messages = await redisClient.xreadgroup(
    "GROUP",
    group,
    consumer,
    "COUNT",
    1,
    "STREAMS",
    stream,
    ">"
  );

  if (!messages) {
    return { message: "No new events" };
  }

  const messageId = messages[0][1][0][0];
  const fields = messages[0][1][0][1];

  // ACK
  await redisClient.xack(stream, group, messageId);

  return {
    messageId,
    fields,
    status: "Processed and ACKed",
  };
};


const exerciseServiceEleven = async () => {
  let allKeys = [];
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redisClient.scan(
      cursor,
      "MATCH",
      "user:*",
      "COUNT",
      100
    );
    cursor = nextCursor;
    allKeys = allKeys.concat(keys);
    console.log("Found keys:", keys);
  } while (cursor !== "0");

  const type = await redisClient.type("session:123");
  console.log("Key type:", type); // string | hash | list | set | zset

  const keyCount = await redisClient.dbsize();
  console.log("Total keys:", keyCount);

  const serverInfo = await redisClient.info();
  const keyspaceInfo = await redisClient.info("keyspace");

  return {
    scannedKeys: allKeys,
    keyType: type,
    totalKeys: keyCount,
    serverInfo: serverInfo.substring(0, 200) + "...", // Truncate for readability
    keyspaceInfo
  };
}


const exerciseServiceTwelve = async () => {
  const key = "drivers";

  // 1️⃣ Add locations
  await redisClient.geoadd(key, 77.1025, 28.7041, "driver:1");
  await redisClient.geoadd(key, 77.2167, 28.6448, "driver:2");
  await redisClient.geoadd(key, 77.2090, 28.6139, "driver:3");

  // 2️⃣ Find nearby drivers
  const nearby = await redisClient.geosearch(
    key,
    "FROMLONLAT",
    77.2167,
    28.6448,
    "BYRADIUS",
    5,
    "km",
    "WITHDIST"
  );

  // 3️⃣ Measure distance
  const distance = await redisClient.geodist(
    key,
    "driver:1",
    "driver:3",
    "km"
  );

  return {
    nearbyDrivers: nearby,
    distanceBetweenDrivers: distance,
  };
};



module.exports = {
  exerciseServiceOne,
  exerciseServiceTwo,
  exerciseServiceThree,
  exerciseServiceFour,
  exerciseServiceFive,
  exerciseServiceSix,
  exerciseServiceSeven,
  exerciseServiceEight,
  exerciseServiceNine,
  exerciseServiceTen,
  exerciseServiceEleven,
  exerciseServiceTwelve

};