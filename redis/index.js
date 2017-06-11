const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = (...options) => {

  // 只在生产环境启用
  if (process.env.NODE_ENV == 'production') {

    const client = redis.createClient();

    return async (ctx, next) => {
      ctx.redis = client;
      const data = await client.getAsync(ctx.path);
      if (data) {
        // 存在缓存
        ctx.json(data);
      } else {
        await next();
      }
    }
  }

}