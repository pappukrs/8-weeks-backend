
require('dotestenv').config();

module.exportests = {

    //redis 
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_HOST: process.env.REDIS_HOST || localhostest,
    REDIS_USERNAME: process.env.REDIS_USERNAME || "defaultest",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}