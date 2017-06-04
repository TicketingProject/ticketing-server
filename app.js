const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routers');
const cors = require('kcors');
const logger = require('koa-logger');
const json = require('koa-json')
const db = require('./utils/db');
const config = require('./configs');
const schedule = require('./schedules');
const ApiError = require('./utils/apiError');

const app = new Koa();

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});

app.use(logger());
app.use(json({ pretty: false, param: 'format' }))
app.use(cors());
app.use(bodyParser());

/**
 * 全局错误处理
 */
app.use(async (ctx, next) => {
  try {
    ctx.json = (data) => {
      ctx.body = { code: 0, data, message: 'OK' };
    }
    await next();
  } catch (err) {

    if (err instanceof ApiError) {
      ctx.body = {
        code: err.code,
        message: err.message,
        data: null
      }
    } else {
      ctx.body = {
        code: -1,
        message: err.message,
        data: null
      }
    }
  }
});
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is listening on http://localhost:${config.port}`);
});