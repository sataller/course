const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require ('../controllers/auth');

// passport.authenticate('jwt', {session:false})  нужно добавить ко всем роутам
router.post('/login', controller.login);
//localhost:5000/api/auth/register
router.post('/register', controller.register);

module.exports = router;
