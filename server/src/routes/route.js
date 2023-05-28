const express = require('express');
const router = express.Router();
const routeController = require('../app/controllers/RouteController');

router.get('', routeController.index);
module.exports = router;
