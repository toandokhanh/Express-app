const newRouter = require('./news');
const blogRouter = require('./blog');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
function route(APP) {
    //news router
    APP.use('/courses', coursesRouter);
    APP.use('/news', newRouter);
    APP.use('/blog', blogRouter);
    APP.use('', siteRouter);
}

module.exports = route;
