const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('../configs');

const router = new Router();
const JWTAuth = jwt({ secret: config.JWTSecret });

const movieRouter = require('./movie');
// const userRouter = require('./user');

// router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/api/movie', movieRouter.routes(), movieRouter.allowedMethods());

module.exports = router;

