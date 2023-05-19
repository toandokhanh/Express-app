const express = require('express');
const router = express.Router();
const BlogController = require('../app/controllers/BlogController');

router.get('/:slug', BlogController.detail);
router.get('', BlogController.index);
module.exports = router;
