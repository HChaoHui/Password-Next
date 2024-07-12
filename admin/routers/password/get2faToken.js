const router = require('./router');
const speakeasy = require('speakeasy');
const checkToken = require('./public/checkToken');

const checkBody = async (ctx, next) => {

    const code400 = {
        msg: 'The request was unsuccessful. Please ensure that all data is correct and error-free.'
    };

    const { secret } = ctx.request.body;

    if (!secret) {
        ctx.status = 400;
        ctx.body = code400;
        return;
    }

    await next();
};

const get2faToken = async (ctx) => {

    const { secret } = ctx.request.body;

    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });

    // 计算剩余时间
    const timeStep = 30; // 30秒为一个周期
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = timeStep - (currentTime % timeStep);

    ctx.body = {
        data: {
            token: token,
            remainingTime: remainingTime,
        },
        status: 200,
        message: 'success',
    }

};

router.post('/get2faToken', checkToken, checkBody, get2faToken);

module.exports = router;