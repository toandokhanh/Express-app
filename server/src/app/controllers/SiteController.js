const Courses = require('../models/Courses');

class SiteController {
    // index(req, res) {
    //     res.render('home');
    // }
    index(req, res, next) {
        Courses.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .then((courses) => {
                courses = courses.map((course) => course.toObject());
                res.render('home', { courses });
                // res.json(courses);
            })
            .catch(next);
    }

    contacts(req, res) {
        res.render('aboutus');
    }
}

module.exports = new SiteController();
