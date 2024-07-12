const router = require('./router');
const checkToken = require('./public/checkToken');
const getSqlite = require('../../utils/database/getSqlite');
const deleteSqliteTableData = require('../../utils/database/deleteSqliteTableData');

const checkBody = async (ctx, next) => {
    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };
    const { id } = ctx.request.body;

    if (!id) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    const db = getSqlite(ctx.state.userData.user, 'password');

    const deleteDataInfo = await deleteSqliteTableData(db,'password',{id})

    ctx.state.nlog(deleteDataInfo);

    db.close();

    ctx.state.responseData = {
        status: 200,
        message: 'success',
    }

    await next();
};
const deletePassword = async (ctx) => {
    ctx.body = ctx.state.responseData
};

router.post('/deletePassword', checkToken, checkBody, deletePassword);

module.exports = router;