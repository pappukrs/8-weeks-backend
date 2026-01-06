const express = require("express");
const redisClient = require("./config/redis.js");
const routes = require("./routes.js");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use("/api", routes);

app.get("/", async (req, res) => {
    try {
        await redisClient.set("visits", await redisClient.get("visits") ? parseInt(await redisClient.get("visits")) + 1 : 1,"EX", 60);
        const visits = await redisClient.get("visits");
        res.send(`Number of visits: ${visits}`);
    } catch (err) {
        res.status(500).send("Error connecting to Redis");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});