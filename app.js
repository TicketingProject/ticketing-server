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
