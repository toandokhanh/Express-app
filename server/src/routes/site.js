const express = require('express');
const SiteController = require('../app/controllers/SiteController');
const router = express.Router();
//contact page
router.get('/contacts', SiteController.contacts);
//home page
router.get('/', SiteController.index);

module.exports = router;
