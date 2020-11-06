const express = require('express');
const router = express.Router();
const controller = require ('../controllers/user');

router.get('/:userId', controller.getByUserId);
router.get('/', controller.getUsers);
router.delete('/:userId', controller.remove);

module.exports = router;
