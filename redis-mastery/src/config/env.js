
require('dotenv').config();

module.exports = {

    //redis 
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_HOST: process.env.REDIS_HOST || localhost,
    REDIS_USERNAME: process.env.REDIS_USERNAME || "default",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}