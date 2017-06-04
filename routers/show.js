const Router = require('koa-router');
const router = new Router();
const showController = require('../controllers/show');

router.get('/', showController.getShow);
router.get('/detail', showController.getShowDetail);

module.exports = router;
