class RouteController {
    index(req, res) {
        res.render('routes');
    }
}

module.exports = new RouteController();
