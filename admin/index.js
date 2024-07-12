const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const nlogController = require('./utils/nlog');
const app = new Koa();

require('dotenv').config();

let corsConfig = {
    origin: function (ctx) {
        const allowedOrigins = ['http://localhost:3000'];
        const requestOrigin = ctx.get('Origin');
        if (allowedOrigins.includes(requestOrigin)) {
            return requestOrigin;
        }
        return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
}

app.use(cors(corsConfig))
app.use(bodyParser());
app.use(nlogController());

const routers = require('./routers/main');

routers.forEach((router) => {
    app.use(router.routes()).use(router.allowedMethods());
});

console.log('Server Is Start, listening On Port 19899');
app.listen(19899);