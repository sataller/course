const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', controller.logout);
router.get('/confirm/:userId', controller.confirm);

module.exports = router;