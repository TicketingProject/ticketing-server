const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('../configs');

const router = new Router();
const JWTAuth = jwt({ secret: config.JWTSecret });

const movieRouter = require('./movie');
const cinemaRouter = require('./cinema');
const areaRouter = require('./area');

router.use('/api/area', areaRouter.routes(), areaRouter.allowedMethods());
router.use('/api/cinema', cinemaRouter.routes(), cinemaRouter.allowedMethods());
router.use('/api/movie', movieRouter.routes(), movieRouter.allowedMethods());

module.exports = router;

