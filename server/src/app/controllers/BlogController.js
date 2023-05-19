class BlogController {
    index(req, res) {
        res.render('blog');
    }
    detail(req, res) {
        res.send('day la trang chi  blog');
    }
}

module.exports = new BlogController();
