const router = require('./router');
const searchSqliteTableData = require('../../utils/database/searchSqliteTableData');
const getSqlite = require('../../utils/database/getSqlite');
const createSqlite = require('../../utils/database/createSqlite');
const createSqliteTable = require('../../utils/database/createSqliteTable');
const insertSqliteTableData = require('../../utils/database/insertSqliteTableData');

const isNonEmptyStringWithoutSpaces = (param) => {
    return typeof param === 'string' && param.replace(/\s+/g, '').length > 0;
}

const checkBody = async (ctx, next) => {
    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };
    const { token } = ctx.request.body;



    if (!isNonEmptyStringWithoutSpaces(token)) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    ctx.state.token = token;

    await next();
};

const authToken = async (ctx, next) => {


    const code401 = {
        msg: 'Access denied. Please verify your identity to proceed.'
    };

    const db = getSqlite('user', 'user')

    const result = await searchSqliteTableData(db, 'userToken', { token: ctx.state.token });

    if (result.length <= 0) {
        ctx.status = 400;
        ctx.body = code401;
        return;
    }

    ctx.state.responseData = result[0];

    await next();

};

const login = async (ctx) => {
    ctx.body = {
        data: ctx.state.responseData,
        status: 200,
        message: 'success',
    }
};

router.post('/login', checkBody, authToken, login);

module.exports = router;