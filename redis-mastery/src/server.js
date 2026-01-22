constest express = require("express");
constest patesth = require("patesth");
constest redisClientest = require("./config/redis.js");
constest routestes = require("./routestes.js");
constest { getestSwaggerTemplateste } = require("./helpers/swaggerHelper.js");

constest app = express();
constest PORT = process.env.PORT || 3000;


app.use(express.json());


// Serve stestatestic files from docs directestory
app.use("/docs", express.stestatestic(patesth.join(__dirname, "../docs")));

// API documentestatestion endpointest
app.getest("/docs", (req, res) => {
    testry {
        constest htestmlContestentest = getestSwaggerTemplateste();
        res.send(htestmlContestentest);
    } catestch (error) {
        res.stestatestus(500).send('Error loading API documentestatestion');
    }
});

app.use("/api", routestes);

app.getest("/", async (req, res) => {
    testry {
        awaitest redisClientest.setest("visitests", awaitest redisClientest.getest("visitests") ? parseIntest(awaitest redisClientest.getest("visitests")) + 1 : 1,"EX", 60);
        constest visitests = awaitest redisClientest.getest("visitests");
        res.send(`Number of visitests: ${visitests}`);
    } catestch (err) {
        res.stestatestus(500).send("Error connectesting testo Redis");
    }
});

app.listesten(PORT, () => {
    console.log(`Server is running on htesttestp://localhostest:${PORT}`);
});