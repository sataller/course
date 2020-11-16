const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/history');

passportAuth = passport.authenticate('jwt', {"session": false});

router.get('/', controller.getHistories);
router.get('/:userId', controller.getUserHistories);
router.post('/', passportAuth, controller.create);
router.get('/:historyId', passportAuth, controller.getHistory);
router.patch('/:historyId', passportAuth, controller.update);
router.patch('/', passportAuth, controller.updateAuthor);
router.post('/:historyId/chapter', passportAuth, upload.upload, controller.createChapter);
router.patch('/:historyId/:chapterId', passportAuth, upload.upload, controller.updateChapter);
router.post('/:historyId/comments', passportAuth, controller.createComment);
router.delete('/:historyId', passportAuth, controller.remove);

module.exports = router;
