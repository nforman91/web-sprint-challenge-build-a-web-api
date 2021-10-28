const Actions = require('../actions/actions-model');

function logger(req, res, next) {
    const method = req.method;
    const url = req.baseUrl;
    const timestamp = new Date().toLocaleString();
    console.log(`${method} ${url} ${timestamp}`);
    next();
};

module.exports = {
    logger
}