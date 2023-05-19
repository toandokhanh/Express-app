const Courses = require('../models/Courses');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((courses) => {
                // res.json(courses);
                res.render('courses/show', {
                    courses: mongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        const store = req.body;
        store.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // res.json(store);
        const course = new Courses(store);
        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch(next);
    }
    // [GET] /courses
    index(req, res, next) {
        // sữ dụng callback để lấy cdls ra
        // Courses.find({}, function (err, courses) {
        //     if (!err) res.json(courses);
        //     else res.status(400).json({ message: 'error!!' });  });
        // sữ dụng promise
        Courses.find({})
            .then((courses) => {
                courses = courses.map((course) => course.toObject());
                res.render('courses', { courses });
            })
            .catch(next);
    }
}

module.exports = new CourseController();
