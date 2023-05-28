const Blogs = require('../models/Blog');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class BlogController {
    index(req, res, next) {
        Blogs.find({})
            .then((Blogs) => {
                res.render('blog', { blog: mutipleMongooseToObject(Blogs) });
                // res.json(blogs);
            })
            .catch(next);
    }
    detail(req, res) {
        res.send('day la trang chi  blog');
    }
}

module.exports = new BlogController();
