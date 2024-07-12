const getSqlite = require('../../../utils/database/getSqlite');
const searchSqliteTableData = require('../../../utils/database/searchSqliteTableData');

const checkToken = async (ctx, next) => {

    const code401 = {
        msg: 'Access denied. Please verify your identity to proceed.'
    };
    const authHeader = ctx.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = code401;
        return;
    }

    ctx.state.token = authHeader.substring(7);

    const db = getSqlite('user', 'user')

    const result = await searchSqliteTableData(db, 'userToken', { token: ctx.state.token });

    db.close();

    if (result.length <= 0) {
        ctx.status = 401;
        ctx.body = code401;
        return;
    }

    ctx.state.userData = result[0];

    ctx.state.nlog('LoginUser: ' + ctx.state.userData.user);

    await next();
};

module.exports = checkToken;