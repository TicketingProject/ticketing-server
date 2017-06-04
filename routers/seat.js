const Router = require('koa-router');
const router = new Router();
const seatController = require('../controllers/seat');

router.get('/', seatController.getSeat);

module.exports = router;
