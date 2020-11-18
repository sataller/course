const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/history');

passportAuth = passport.authenticate('jwt', {"session": false});

router.get('/', controller.getHistories);
router.get('/:userId', controller.getUserHistories);
router.get('/read/:historyId', passportAuth, controller.getHistory);
router.post('/', passportAuth, controller.create);
router.patch('/:historyId', passportAuth, controller.update);
router.patch('/', passportAuth, controller.updateAuthor);
router.patch('chapter/:historyId/', passportAuth, upload.upload, controller.updateChapter);
router.post('/:historyId/chapter', passportAuth, upload.upload, controller.createChapter);
router.post('/:historyId/comments', passportAuth, controller.createComment);
router.delete('/:historyId', passportAuth, controller.remove);

module.exports = router;
