const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routers');
const cors = require('kcors');
const logger = require('koa-logger');
const json = require('koa-json')
const db = require('./utils/db');
const config = require('./configs');
const schedule = require('./schedules');

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
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is listening on http://localhost:${config.port}`);
});