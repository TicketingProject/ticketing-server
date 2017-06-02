const Router = require('koa-router');
const router = new Router();
const movieController = require('../controllers/movie');

router.get('/', movieController.getAll);
router.get('/:id', movieController.getDetail);
router.get('/auto/refresh', movieController.reflesh);

module.exports = router;
