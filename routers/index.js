const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('../configs');

const router = new Router();
const JWTAuth = jwt({ secret: config.JWTSecret });

const userRouter = require('./user');
const movieRouter = require('./movie');
const cinemaRouter = require('./cinema');
const areaRouter = require('./area');
const showRouter = require('./show');
const seatRouter = require('./seat');

router.use('/api/token', userRouter.routes(), userRouter.allowedMethods());
router.use('/api/seat', seatRouter.routes(), seatRouter.allowedMethods());
router.use('/api/show', showRouter.routes(), showRouter.allowedMethods());
router.use('/api/area', areaRouter.routes(), areaRouter.allowedMethods());
router.use('/api/cinema', cinemaRouter.routes(), cinemaRouter.allowedMethods());
router.use('/api/movie', movieRouter.routes(), movieRouter.allowedMethods());

// Token 校验
// router.use('/api/order', JWTAuth, orderRouter.routes(), orderRouter.allowedMethods());

module.exports = router;
