const { redisData } = require('../config');
const Redis = require('ioredis');
const redis = new Redis(redisData);

class RedisCache {
  constructor(options = {}) {

  }
  /**
   *
   * @param key
   * @param value
   * @param expire
   * @returns {Promise<*>}
   */
  async set(key, value, expire = 60) {
    return await redis.set(key, value, 'EX', expire)
  }

  /**
   *
   * @param key
   * @returns {Promise<*>}
   */
  async get(key) {
    return await redis.get(key)
  }
}

module.exports = RedisCache;
