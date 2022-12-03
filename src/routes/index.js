const newRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    //news router
    app.use('/news', newRouter);
    app.use('', siteRouter);
}

module.exports = route;
