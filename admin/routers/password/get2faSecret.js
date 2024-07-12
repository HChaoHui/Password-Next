const router = require('./router');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const get2faSecretQRCode = (otpauth_url) => {

    return new Promise((resolve, reject) => {
        QRCode.toDataURL(otpauth_url, (err, data_url) => {
            if (err) {
                reject(err);
            }
            resolve(data_url);
        });
    });

}

const get2faSecret = async (ctx) => {

    const secret = speakeasy.generateSecret({ length: 20 });

    const QRCode = await get2faSecretQRCode(secret.otpauth_url);

    ctx.body = {
        data: {
            secret: secret.base32,
            QRCode: QRCode,
        },
        status: 200,
        message: 'success',
    }

};

router.get('/get2faSecret', get2faSecret);

module.exports = router;