const express = require('express');
const SiteController = require('../app/controllers/SiteController');
const router = express.Router();
//contact page
router.get('/', SiteController.index);
//home page
router.get('/aboutUs', SiteController.contacts);

module.exports = router;
