const newRouter = require('./news');
const siteRouter = require('./site');

function route(APP) {
    //news router
    APP.use('/news', newRouter);
    APP.use('', siteRouter);
}

module.exports = route;
