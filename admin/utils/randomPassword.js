const getRandomPassword = (length) => {

    if (!length || length - 6 < 2) {
        throw new Error("Length must be greater than 8");
    }

    const numLowercase = length - 6;
    const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
    const upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharset = "0123456789";
    const specialCharset = "!@#$%^&*()_+[]{}|;:,.<>?";
    const allCharset = lowerCharset + upperCharset + numberCharset + specialCharset;

    let password = "";

    for (let i = 0; i < 2; i++) {
        password += upperCharset[Math.floor(Math.random() * upperCharset.length)];
    }

    for (let i = 0; i < numLowercase; i++) {
        password += lowerCharset[Math.floor(Math.random() * lowerCharset.length)];
    }

    for (let i = 0; i < 2; i++) {
        password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
    }

    for (let i = 0; i < 2; i++) {
        password += specialCharset[Math.floor(Math.random() * specialCharset.length)];
    }

    for (let i = password.length; i < length; i++) {
        password += allCharset[Math.floor(Math.random() * allCharset.length)];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}


module.exports = getRandomPassword;