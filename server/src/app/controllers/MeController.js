const { mutipleMongooseToObject } = require('../../util/mongoose');
const Courses = require('../models/Courses');

class MeController {
    // [GET] me/store/courses
    store(req, res, next) {
        Courses.find({})
            .then((Courses) => {
                res.render('me/storeCourses', {
                    courses: mutipleMongooseToObject(Courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
