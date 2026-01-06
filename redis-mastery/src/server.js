const express = require("express");
const path = require("path");
const redisClient = require("./config/redis.js");
const routes = require("./routes.js");
const { getSwaggerTemplate } = require("./helpers/swaggerHelper.js");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


// Serve static files from docs directory
app.use("/docs", express.static(path.join(__dirname, "../docs")));

// API documentation endpoint
app.get("/docs", (req, res) => {
    try {
        const htmlContent = getSwaggerTemplate();
        res.send(htmlContent);
    } catch (error) {
        res.status(500).send('Error loading API documentation');
    }
});

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