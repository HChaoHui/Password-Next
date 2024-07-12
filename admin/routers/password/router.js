const Router = require('koa-router');
const path = require('path');
const router = new Router();
const currentDirectory = path.basename(__dirname);
router.prefix('/' + currentDirectory)

module.exports = router