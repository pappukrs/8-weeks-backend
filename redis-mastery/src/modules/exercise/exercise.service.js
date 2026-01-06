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


module.exports = {
  exerciseServiceOne,
  exerciseServiceTwo,
};
