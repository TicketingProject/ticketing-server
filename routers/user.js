const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user');

router
  .post('/', userController.getToken)

module.exports = router;
