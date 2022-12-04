class SiteController {
    index(req, res) {
        res.render('home');
    }
    contacts(req, res) {
        res.render('contact');
    }
}

module.exports = new SiteController();
