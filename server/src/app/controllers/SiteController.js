const Courses = require('../models/Courses');

class SiteController {
    index(req, res) {
        res.render('home');
    }
    contacts(req, res) {
        // res.render('contact');
        Courses.find({}, function (err, courses) {
            if (!err) res.json(courses);
            else res.status(400).json({ message: 'error!!' });
        });
    }
}

module.exports = new SiteController();
