const express = require('express');
const SiteController = require('../app/controllers/SiteController');
const router = express.Router();
//contact page
router.use('/contacts', SiteController.contacts);
//home page
router.use('/', SiteController.index);

module.exports = router;
