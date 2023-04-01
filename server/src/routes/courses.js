const express = require('express');
const coursesController = require('../app/controllers/CourseController');
const router = express.Router();

router.get('/:slug', coursesController.show);

module.exports = router;
