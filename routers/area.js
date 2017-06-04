const Router = require('koa-router');
const router = new Router();
const areaController = require('../controllers/area');

router.get('/', areaController.getAll);
router.get('/:lat/:lng', areaController.getByPos);

module.exports = router;
