const router = require('./router');
const checkToken = require('./public/checkToken');
const getSqlite = require('../../utils/database/getSqlite');
const changeSqliteTableData = require('../../utils/database/changeSqliteTableData');

const checkBody = async (ctx, next) => {
    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };
    const { id, account, password, appName, webSite, twofa } = ctx.request.body;

    if (!id || !account || !password || !appName || !webSite) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    const db = getSqlite(ctx.state.userData.user, 'password');

    const updateData = {
        account: account,
        password: password,
        appName: appName,
        webSite: webSite,
        updateTime: new Date().toISOString(),
        twofa: twofa ? twofa : ''
    }

    const conditions = {
        id: id
    }

    const updateDataInfo = await changeSqliteTableData(db, 'password', updateData, conditions);

    ctx.state.nlog(updateDataInfo);

    db.close();

    ctx.state.responseData = {
        status: 200,
        message: 'success',
    }

    await next();
};
const editPassword = async (ctx) => {
    ctx.body = ctx.state.responseData
};

router.post('/editPassword', checkToken, checkBody, editPassword);

module.exports = router;