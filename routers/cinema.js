const Router = require('koa-router');
const router = new Router();
const cinemaController = require('../controllers/cinema');

router.get('/', cinemaController.getAll);
router.get('/:areaId', cinemaController.getByArea);
router.get('/:areaId/:lat/:lng', cinemaController.getByPos);

router.get('/only/for/init/db', cinemaController.init);

module.exports = router;
