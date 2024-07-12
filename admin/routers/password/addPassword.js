const router = require('./router');
const checkToken = require('./public/checkToken');
const getSqlite = require('../../utils/database/getSqlite');
const createSqlite = require('../../utils/database/createSqlite');
const createSqliteTable = require('../../utils/database/createSqliteTable');
const insertSqliteTableData = require('../../utils/database/insertSqliteTableData');

const checkBody = async (ctx, next) => {
    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };
    const { account, password, appName, webSite, twofa } = ctx.request.body;

    if (!account || !password || !appName || !webSite) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    const createSqliteInfo = await createSqlite(ctx.state.userData.user, 'password');

    ctx.state.nlog(createSqliteInfo);

    const db = getSqlite(ctx.state.userData.user, 'password');

    const createTableInfo = await createSqliteTable(db, 'password', {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        account: 'TEXT',
        password: 'TEXT',
        appName: 'TEXT',
        webSite: 'TEXT',
        createTime: 'TEXT',
        updateTime: 'TEXT',
        twofa: "TEXT"
    });

    ctx.state.nlog(createTableInfo);

    const insertDataInfo = await insertSqliteTableData(db, 'password', {
        account: account,
        password: password,
        appName: appName,
        webSite: webSite,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        twofa: twofa ? twofa : ''
    });

    ctx.state.nlog(insertDataInfo);

    db.close();

    ctx.state.responseData = {
        status: 200,
        message: 'success',
    }

    await next();
};
const addPassword = async (ctx) => {
    ctx.body = ctx.state.responseData
};

router.post('/addPassword', checkToken, checkBody, addPassword);

module.exports = router;