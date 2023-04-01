const newRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
function route(APP) {
    //news router
    APP.use('/courses', coursesRouter);
    APP.use('/news', newRouter);
    APP.use('', siteRouter);
}

module.exports = route;
