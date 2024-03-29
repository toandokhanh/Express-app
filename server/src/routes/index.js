const newRouter = require('./news');
const routeRouter = require('./route');
const blogRouter = require('./blog');
const siteRouter = require('./site');
const meRouter = require('./me');
const userRouter = require('./user');
const coursesRouter = require('./courses');
function route(APP) {
    //news router
    APP.use('/courses', coursesRouter);
    APP.use('/news', newRouter);
    APP.use('/route', routeRouter);
    APP.use('/blog', blogRouter);
    APP.use('/me', meRouter);
    APP.use('/user', userRouter);
    APP.use('', siteRouter);
}

module.exports = route;
