const router = require('./router');
const checkToken = require('./public/checkToken');
const getSqlite = require('../../utils/database/getSqlite');
const searchSqliteTableData = require('../../utils/database/searchSqliteTableData');

const getPassword = async (ctx) => {

    const db = getSqlite(ctx.state.userData.user, 'password')

    const result = await searchSqliteTableData(db, 'password', {});

    db.close();

    ctx.body = {
        data: result,
        status: 200,
        message: 'success',
    }
};

router.get('/getPassword', checkToken, getPassword);

module.exports = router;