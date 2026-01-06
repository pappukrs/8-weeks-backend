const redisClient = require("../../config/redis");
const crypto = require("crypto");


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


module.exports = {
  exerciseServiceOne,
  exerciseServiceTwo,
  exerciseServiceThree,
  exerciseServiceFour,
  exerciseServiceFive,
};