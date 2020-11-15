const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth');

//http://localhost:5000/auth
passportAuth = passport.authenticate('jwt', {"session": false});

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', controller.logout);
router.get('/confirm/:userId', controller.confirm);
router.get('/me', passportAuth, controller.initialization);

module.exports = router;