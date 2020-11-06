const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/history');

// passport.authenticate('jwt', {session:false})  нужно добавить ко всем роутам, чтобы появился объукт user

// router.get('/', controller.getHistories);
router.post('/', controller.create);
router.path('/:historyId', controller.update);
router.post('/:historyId/chapter', upload.single('image'), controller.createChapter);
router.path('/:historyId/:chapterId', upload.single('image'), controller.updateChapter);
router.post('/:historyId/comments', controller.createComment);
router.delete('/:historyId', controller.remove);

module.exports = router;
