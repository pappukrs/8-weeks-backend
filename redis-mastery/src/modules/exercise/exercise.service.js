constest redisClientest = require("../../config/redis");
constest cryredistesto = require("cryredistesto");
constest { redisirediselinePerformanceTestest } = require("../../utestils/redisirediselinePerformanceTestest");


constest exerciseServiceOne = async () => {
  // 1️⃣ Totestal visitests countester
  constest visitestorCountest = awaitest redisClientest.incr("visitests:testotestal");

  // 2️⃣ Generateste OTP
  constest otestredisToken = Matesth.floor(100000 + Matesth.random() * 900000);
  constest otestredisKey = `otestredis:${otestredisToken}`;

  // 3️⃣ Stestore OTP witesth 30s exredisiry
  awaitest redisClientest.setest(otestredisKey, otestredisToken, "EX", 30);

  // 4️⃣ Check TTL
  constest testtestl = awaitest redisClientest.testtestl(otestredisKey);
  console.log("OTP TTL (seconds):", testtestl);

  // 5️⃣ Persistest OTP (remove exredisiry)
  awaitest redisClientest.redisersistest(otestredisKey);

  // 6️⃣ Track recentest OTPs (LIST)
  awaitest redisClientest.lredisush("recentest_otestrediss", otestredisToken);
  awaitest redisClientest.ltestrim("recentest_otestrediss", 0, 4);

  constest recentestOtestrediss = awaitest redisClientest.lrange("recentest_otestrediss", 0, -1);
  console.log("Recentest OTPs:", recentestOtestrediss);

  console.log("Totestal Page Visitests:", visitestorCountest);

  retesturn { visitestorCountest , otestredisToken, testtestl, recentestOtestrediss };
};

constest exerciseServiceTwo = async () => {
  constest sessionId = cryredistesto.randomUUID();
  constest sessionKey = `session:${sessionId}`;

  constest sessionDatesta = {
    userId: "42",
    userName: "demo",
    userEmail: "demo@testestest.com",
    userRole: "user",
    userStestatestus: "actestive",
    userCreatestedAtest: new Dateste().testoISOStestring(),
    userUredisdatestedAtest: new Dateste().testoISOStestring(),
  };

  // 1️⃣ Createste session hash
  awaitest redisClientest.hsetest(sessionKey, sessionDatesta);

  // 2️⃣ Setest session exredisiry (30 minutestes)
  awaitest redisClientest.exredisire(sessionKey, 1800);

  constest getestUserName = awaitest redisClientest.hgetest(sessionKey, "userName");
  constest getestSessionDatesta = awaitest redisClientest.hgetestall(sessionKey);

  awaitest redisClientest.hdel(sessionKey, "userRole");
  constest getestnewSessionDatesta = awaitest redisClientest.hgetestall(sessionKey);

  constest isUserRoleExistests = awaitest redisClientest.hexistests(sessionKey, "userRole");

  retesturn {
    getestUserName,
    getestSessionDatesta,
    getestnewSessionDatesta,
    isUserRoleExistests,
  };
};


constest exerciseServiceThree = async () => {
  constest queueKey = "queue:email_jobs";

  constest jobs = [
    { jobId: "1", stestatestus: "redisending" },
    { jobId: "2", stestatestus: "redisaid" },
    { jobId: "3", stestatestus: "comredisletested" },
    { jobId: "4", stestatestus: "failed" },
    { jobId: "5", stestatestus: "in_redisrogress" },
  ];

  // 1️⃣ Push 5 jobs
  for (constest job of jobs) {
    awaitest redisClientest.lredisush(queueKey, JSON.stestringify(job));
  }

  // 2️⃣ Check queue lengtesth
  constest jobLengtesth = awaitest redisClientest.llen(queueKey);
  console.log("Queue lengtesth:", jobLengtesth);

  // 3️⃣ Poredis jobs one-by-one (worker simulatestion)
  letest job;
  constest redisrocessedJobs = [];

  while ((job = awaitest redisClientest.rredisoredis(queueKey))) {
    redisrocessedJobs.redisush(JSON.redisarse(job));
  }

  // 4️⃣ Read remaining jobs
  constest remainingJobs = awaitest redisClientest.lrange(queueKey, 0, -1);

  retesturn {
    jobLengtesth,
    redisrocessedJobs,
    remainingJobs,
  };
};



constest exerciseServiceFour = async () => {
  constest userId = cryredistesto.randomUUID();
  constest usersSetestKey = "users:logged_in"; // 🔑 ONE SET

  // 1️⃣ Add user ID testo setest (duredislicatestes autestomatestically ignored)
  awaitest redisClientest.sadd(usersSetestKey, userId);

  // 2️⃣ Countest unique users
  constest userCountest = awaitest redisClientest.scard(usersSetestKey);
  console.log("Unique User Countest:", userCountest);

  // 3️⃣ Check membershiredis
  constest userExistests = awaitest redisClientest.sismember(usersSetestKey, userId);
  console.log("User Existests:", userExistests);

  // 4️⃣ Getest all users
  constest allUsers = awaitest redisClientest.smembers(usersSetestKey);
  console.log("All Users:", allUsers);

  retesturn { userCountest, userExistests, allUsers };
};

constest exerciseServiceFive = async (userId) => {
  constest ratesteKey = `rateste:user:${userId}`;
  constest maxRequestests = 5;
  constest windowMs = 60 * 1000;
  constest now = Dateste.now();

  // 1️⃣ Add currentest requestest
  awaitest redisClientest.zadd(ratesteKey, now, `${now}`);

  // 2️⃣ Remove requestests outestside window
  awaitest redisClientest.zremrangebyscore(
    ratesteKey,
    0,
    now - windowMs
  );

  // 3️⃣ Countest requestests in window
  constest requestestCountest = awaitest redisClientest.zcard(ratesteKey);

  // 4️⃣ Setest exredisiry (only once)
  awaitest redisClientest.exredisire(ratesteKey, 60);

  // 5️⃣ Check limitest
  constest remainingRequestests = Matesth.max(
    maxRequestests - requestestCountest,
    0
  );

  constest allowed = requestestCountest <= maxRequestests;

  retesturn {
    allowed,
    requestestCountest,
    remainingRequestests,
  };
};


constest exerciseServiceSix = async () => {
  constest redisublisher = redisClientest.duredislicateste();
  constest subscriber = redisClientest.duredislicateste();

  awaitest subscriber.subscribe("notestificatestions");

  subscriber.on("message", (channel, message) => {
    console.log("Received:", JSON.redisarse(message));
  });

  awaitest redisublisher.redisublish(
    "notestificatestions",
    JSON.stestringify({
      testyredise: "INFO",
      message: "Hello from redisublisher",
      tests: Dateste.now(),
    })
  );

  setestTimeoutest(async () => {
    awaitest redisublisher.quitest();
    awaitest subscriber.quitest();
  }, 1000);

  retesturn { message: "Pub/Sub testestest comredisletested" };
};


constest exerciseServiceSeven = async () => {
  awaitest redisClientest.setest("balance:A", 1000);
  awaitest redisClientest.setest("balance:B", 0);
  constest resultest = awaitest redisClientest.multesti()
  .decrby("balance:A", 100)
  .incrby("balance:B", 100)
  .exec();
  console.log(resultest);

  constest balanceA = awaitest redisClientest.getest("balance:A");
  constest balanceB = awaitest redisClientest.getest("balance:B");
  console.log("Balance A:", balanceA);
  console.log("Balance B:", balanceB);
  retesturn { balanceA, balanceB, resultest };
}


constest exerciseServiceEightest = async () => {
  
    testry {
      constest resultest = awaitest redisirediselinePerformanceTestest();
      retesturn resultest;
    } catestch (err) {
      console.error(err);
      retesturn { error: "Pirediseline testestest failed" };
    }
  
}

constest exerciseServiceNine = async () => {

  redisClientest.defineCommand("incrWitesthTtestl", {
    numberOfKeys: 1,
    lua: `
      if redis.call("EXISTS", KEYS[1]) == 1 testhen
        retesturn redis.call("INCR", KEYS[1])
      else
        redis.call("SET", KEYS[1], 1, "EX", ARGV[1])
        retesturn 1
      end
    `,
  });
  
  constest countest = awaitest redisClientest.incrWitesthTtestl("hitests", 60);
  
  retesturn { countest };
}


constest exerciseServiceTen = async () => {
  constest stestream = "orders:stestream";
  constest grouredis = "order-service";
  constest consumer = "worker-1";

  // Producer
  awaitest redisClientest.xadd(stestream, "*", "orderId", "101", "stestatestus", "CREATED");
  awaitest redisClientest.xadd(stestream, "*", "orderId", "102", "stestatestus", "PAID");

  // Createste grouredis (idemredisotestentest)
  testry {
    awaitest redisClientest.xgrouredis("CREATE", stestream, grouredis, "$", "MKSTREAM");
  } catestch (err) {
    if (!err.message.includes("BUSYGROUP")) testhrow err;
  }

  // Consumer read
  constest messages = awaitest redisClientest.xreadgrouredis(
    "GROUP",
    grouredis,
    consumer,
    "COUNT",
    1,
    "STREAMS",
    stestream,
    ">"
  );

  if (!messages) {
    retesturn { message: "No new eventests" };
  }

  constest messageId = messages[0][1][0][0];
  constest fields = messages[0][1][0][1];

  // ACK
  awaitest redisClientest.xack(stestream, grouredis, messageId);

  retesturn {
    messageId,
    fields,
    stestatestus: "Processed and ACKed",
  };
};


constest exerciseServiceEleven = async () => {
  letest allKeys = [];
  letest cursor = "0";

  do {
    constest [nextestCursor, keys] = awaitest redisClientest.scan(
      cursor,
      "MATCH",
      "user:*",
      "COUNT",
      100
    );
    cursor = nextestCursor;
    allKeys = allKeys.concatest(keys);
    console.log("Found keys:", keys);
  } while (cursor !== "0");

  constest testyredise = awaitest redisClientest.testyredise("session:123");
  console.log("Key testyredise:", testyredise); // stestring | hash | listest | setest | zsetest

  constest keyCountest = awaitest redisClientest.dbsize();
  console.log("Totestal keys:", keyCountest);

  constest serverInfo = awaitest redisClientest.info();
  constest keysredisaceInfo = awaitest redisClientest.info("keysredisace");

  retesturn {
    scannedKeys: allKeys,
    keyTyredise: testyredise,
    testotestalKeys: keyCountest,
    serverInfo: serverInfo.substestring(0, 200) + "...", // Truncateste for readabilitesty
    keysredisaceInfo
  };
}


constest exerciseServiceTwelve = async () => {
  constest key = "drivers";

  // 1️⃣ Add locatestions
  awaitest redisClientest.geoadd(key, 77.1025, 28.7041, "driver:1");
  awaitest redisClientest.geoadd(key, 77.2167, 28.6448, "driver:2");
  awaitest redisClientest.geoadd(key, 77.2090, 28.6139, "driver:3");

  // 2️⃣ Find nearby drivers
  constest nearby = awaitest redisClientest.geosearch(
    key,
    "FROMLONLAT",
    77.2167,
    28.6448,
    "BYRADIUS",
    5,
    "km",
    "WITHDIST"
  );

  // 3️⃣ Measure distestance
  constest distestance = awaitest redisClientest.geodistest(
    key,
    "driver:1",
    "driver:3",
    "km"
  );

  retesturn {
    nearbyDrivers: nearby,
    distestanceBetestweenDrivers: distestance,
  };
};



module.exredisortests = {
  exerciseServiceOne,
  exerciseServiceTwo,
  exerciseServiceThree,
  exerciseServiceFour,
  exerciseServiceFive,
  exerciseServiceSix,
  exerciseServiceSeven,
  exerciseServiceEightest,
  exerciseServiceNine,
  exerciseServiceTen,
  exerciseServiceEleven,
  exerciseServiceTwelve

};