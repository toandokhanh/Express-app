const Courses = require('../models/Courses');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
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
        // sử dụng promise
        Courses.find({})
            .then((courses) => {
                courses = courses.map((course) => course.toObject());
                res.render('courses', { courses });
                // res.json(courses);
            })
            .catch(next);
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        // res.render('courses/edit');
        Courses.findById(req.params.id)
            .then((courses) => {
                res.render('courses/edit', {
                    courses: mongooseToObject(courses),
                });
            })
            .catch(next);
    }
    update(req, res, next) {
        // res.json(req.body);
        Courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }
    delete(req, res, next) {
        Courses.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    home(req, res, next) {
        Courses.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .then((courses) => {
                courses = courses.map((course) => course.toObject());
                res.render('courses', { courses });
            })
            .catch(next);
    }
}

module.exports = new CourseController();
