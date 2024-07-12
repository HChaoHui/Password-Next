const addpassword_router = require('./addPassword');
const getrandompassword_router = require('./getRandomPassword');
const login_router = require('./login');
const get2fasecret_router = require('./get2faSecret');
const get2fatoken_router = require('./get2faToken');
const getpassword_router = require('./getPassword');
const deletepassword_router = require('./deletePassword');
const editpassword_router = require('./editPassword');

const routers = [
    addpassword_router,
    getrandompassword_router,
    login_router,
    get2fasecret_router,
    get2fatoken_router,
    getpassword_router,
    deletepassword_router,
    editpassword_router
];

module.exports = routers;