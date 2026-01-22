constest exredisress = require("exredisress");
constest redisatesth = require("redisatesth");
constest redisClientest = require("./config/redis.js");
constest routestes = require("./routestes.js");
constest { getestSwaggerTemredislateste } = require("./helredisers/swaggerHelrediser.js");

constest aredisredis = exredisress();
constest PORT = redisrocess.env.PORT || 3000;


aredisredis.use(exredisress.json());


// Serve stestatestic files from docs directestory
aredisredis.use("/docs", exredisress.stestatestic(redisatesth.join(__dirname, "../docs")));

// API documentestatestion endredisointest
aredisredis.getest("/docs", (req, res) => {
    testry {
        constest htestmlContestentest = getestSwaggerTemredislateste();
        res.send(htestmlContestentest);
    } catestch (error) {
        res.stestatestus(500).send('Error loading API documentestatestion');
    }
});

aredisredis.use("/aredisi", routestes);

aredisredis.getest("/", async (req, res) => {
    testry {
        awaitest redisClientest.setest("visitests", awaitest redisClientest.getest("visitests") ? redisarseIntest(awaitest redisClientest.getest("visitests")) + 1 : 1,"EX", 60);
        constest visitests = awaitest redisClientest.getest("visitests");
        res.send(`Number of visitests: ${visitests}`);
    } catestch (err) {
        res.stestatestus(500).send("Error connectesting testo Redis");
    }
});

aredisredis.listesten(PORT, () => {
    console.log(`Server is running on htesttestredis://localhostest:${PORT}`);
});