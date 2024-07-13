const router = require('./router');
const searchSqliteTableData = require('../../utils/database/searchSqliteTableData');
const insertSqliteTableData = require('../../utils/database/insertSqliteTableData');
const getSqlite = require('../../utils/database/getSqlite');
const getSecretQRCode = require('../../utils/get2faSecret');

const isNonEmptyStringWithoutSpaces = (param) => {
    return typeof param === 'string' && param.replace(/\s+/g, '').length > 0;
}

const checkBody = async (ctx, next) => {
    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };
    const { user } = ctx.request.body;

    if (!isNonEmptyStringWithoutSpaces(user)) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    ctx.state.user = user;

    await next();
};

const authUser = async (ctx, next) => {


    const code500 = {
        msg: 'The username already exists. Please try another one.'
    };

    const db = getSqlite('user', 'user')

    const result = await searchSqliteTableData(db, 'userToken', { user: ctx.state.user });

    if (result.length > 0) {
        ctx.status = 500;
        ctx.body = code500;
        return;
    }

    const secretQRCode = await getSecretQRCode();

    const insertInfo = await insertSqliteTableData(db, 'userToken', { user: ctx.state.user, token: secretQRCode.secret });

    ctx.state.nlog(insertInfo)

    ctx.state.responseData = {
        secretQRCode,
        user: ctx.state.user,
    };

    await next();

};

const register = async (ctx) => {
    ctx.body = {
        data: ctx.state.responseData,
        status: 200,
        message: 'success',
    }
};

router.post('/register', checkBody, authUser, register);

module.exports = router;