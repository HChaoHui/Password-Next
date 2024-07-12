const nlog = (message) => {
    const cstTimestamp = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
    console.log(`[${cstTimestamp.toISOString()}] [INFO] ${message}`);
}

const nlogController = () => async (ctx, next) => { ctx.state.nlog = nlog; await next(); }

module.exports = nlogController;