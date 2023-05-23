const express = require('express');
const coursesController = require('../app/controllers/CourseController');
const router = express.Router();

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);
router.get('/:slug', coursesController.show);
router.get('/', coursesController.index);

module.exports = router;
