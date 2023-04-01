class CourseController {
    // [GET] /courses/:slug
    show(req, res) {
        res.send('day la trang chi tiet');
    }
}

module.exports = new CourseController();
