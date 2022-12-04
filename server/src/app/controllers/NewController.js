class NewController {
    index(req, res) {
        res.render('news');
    }
    detail(req, res) {
        res.send('day la trang chi tiet');
    }
}

module.exports = new NewController();
