const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routers');
const cors = require('kcors');
const logger = require('koa-logger');
const json = require('koa-json')

const config = require('./configs');
const schedule = require('./schedules');
const db = require('./db');
const redis = require('./redis');

const errorHandler = require('./error');

const app = new Koa();

app.use(bodyParser());

/**
 * 日志中间件
 */
app.use(logger());

/**
 * json 中间件
 */
app.use(json({ pretty: false, param: 'format' }));

/**
 * 跨域中间件
 */
app.use(cors());

/**
 * redis 缓存
 */
app.use(redis());

/**
 * 包装 ctx.body 用于 RESTful json 数据返回
 */
app.use(async (ctx, next) => {
  ctx.json = (data) => {
    if (ctx.redis) {
      // 响应后设置缓存
      ctx.redis.set(ctx.path, data);
      // 10s过期
      ctx.redis.EXPIRE(ctx.path, 10);
    }
    const res = { code: 0, data, message: 'OK' };
    ctx.body = res;
  }
  await next();
});

/**
 * 全局错误处理
 */
app.use(errorHandler());

/**
 * 路由
 */
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is listening on http://localhost:${config.port}`);
});
