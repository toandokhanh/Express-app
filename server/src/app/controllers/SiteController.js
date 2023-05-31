const Courses = require('../models/Courses');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // index(req, res) {
    //     res.render('home');
    // }
    index(req, res, next) {
        Courses.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .then((courses) => {
                const user = req.session.user;
                if (user) {
                    res.render('home', {
                        courses: mutipleMongooseToObject(courses),
                        user: user,
                    });
                } else {
                    res.render('home', {
                        courses: mutipleMongooseToObject(courses),
                    });
                }
            })
            .catch(next);
    }

    contacts(req, res) {
        res.render('aboutus');
    }
}

module.exports = new SiteController();
