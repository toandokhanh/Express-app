const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.get('/register', UserController.register);
router.post('/register', UserController.createNewUser);
router.get('/login', UserController.login);
router.post('/login', UserController.checkLogin);
router.get('/logout', UserController.logout);
module.exports = router;
