const Courses = require('../models/Courses');

class SiteController {
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

    contacts(req, res) {
        res.render('contact');
    }
}

module.exports = new SiteController();
