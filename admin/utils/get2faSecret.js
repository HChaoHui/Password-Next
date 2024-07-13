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

const getSecretQRCode = async () => {

    const secret = speakeasy.generateSecret({ length: 20 });

    const QRCode = await get2faSecretQRCode(secret.otpauth_url);

    return {
        secret: secret.base32,
        QRCode: QRCode,
    }

}


module.exports = getSecretQRCode;