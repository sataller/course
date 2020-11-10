const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require ('../controllers/user');

passportAuth = passport.authenticate('jwt', {"session": false});

router.get('/:userId', passportAuth, controller.getByUserId);
router.get('/', passportAuth, controller.getUsers);
router.patch('/:userId', passportAuth, controller.update);
router.delete('/:userId', passportAuth, controller.remove);

module.exports = router;
