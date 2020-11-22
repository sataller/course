const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/history');

passportAuth = passport.authenticate('jwt', {"session": false});

router.get('/', controller.getHistories);
router.get('/:userId', controller.getUserHistories);
router.get('/read/:historyId', controller.getHistory);
router.post('/create', passportAuth, controller.create);
router.patch('/:historyId', passportAuth, controller.update);
router.patch('/', passportAuth, controller.updateAuthor);
router.patch('/:historyId/:chapterId', passportAuth,
    upload.upload, controller.updateChapter);
router.post('/:historyId/chapter', passportAuth,
    upload.upload, controller.createChapter);
router.delete('/:historyId', passportAuth, controller.remove);
router.delete('/:historyId/:chapterId', passportAuth, controller.removeChapter);

module.exports = router;
