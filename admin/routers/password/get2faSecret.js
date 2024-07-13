const router = require('./router');
const getSecretQRCode = require('../../utils/get2faSecret');

const get2faSecret = async (ctx) => {


    const data = await getSecretQRCode()

    ctx.body = {
        data,
        status: 200,
        message: 'success',
    }

};

router.get('/get2faSecret', get2faSecret);

module.exports = router;