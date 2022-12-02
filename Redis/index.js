const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on('connect', function() {
    console.log('redis Connected!');
  });

  module.exports = redisClient;