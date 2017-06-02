const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user');

router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .get('/logout', userController.logout);

module.exports = router;
