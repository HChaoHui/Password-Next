const router = require('./router');
const randomPassword = require('../../utils/randomPassword');

const getRandomPassword = async (ctx) => {
    const password = randomPassword(20);
    ctx.state.nlog('PasswordGenerateSuccess: ' + password);
    ctx.body = {
        data: randomPassword(20),
        status: 200,
        message: 'success',
    }
};

router.get('/getRandomPassword', getRandomPassword);

module.exports = router;