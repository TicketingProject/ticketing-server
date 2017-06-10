const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routers');
const cors = require('kcors');
const logger = require('koa-logger');
const json = require('koa-json')

const config = require('./configs');
const schedule = require('./schedules');
const db = require('./db');

const errorHandler = require('./error');

const app = new Koa();

app.use(logger());
app.use(json({ pretty: false, param: 'format' }));
app.use(cors());
app.use(bodyParser());

/**
 * 包装 ctx.body 用于 RESTful json 数据返回
 */
app.use(async (ctx, next) => {
  ctx.json = (data) => {
    const res = { code: 0, data, message: 'OK' };
    ctx.body = res;
  }
  await next();
});

/**
 * redis 缓存
 */
if (process.env.NODE_ENV !== 'development') {
  // app.use(redis());
}

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
