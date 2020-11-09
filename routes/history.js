const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/history');

// passport.authenticate('jwt', {session:false})  нужно добавить ко всем роутам, чтобы появился объукт user
passportAuth = passport.authenticate('jwt', {"session": false});
router.get('/', passportAuth, controller.getHistories);
router.post('/', passportAuth, controller.create);
router.get('/:historyId', passportAuth, controller.getHistory);
router.patch('/:historyId', passportAuth, controller.update);
router.post('/:historyId/chapter', passportAuth, upload.single('image'), controller.createChapter);
router.patch('/:historyId/:chapterId', passportAuth, upload.single('image'), controller.updateChapter);
router.post('/:historyId/comments', passportAuth, controller.createComment);
router.delete('/:historyId', passportAuth, controller.remove);

module.exports = router;

// send to update
// {
//     "description":"!!!!!!!!Test history update",
//     "title":"chapter change",
//     "like":false,
//     "rating":5,
//     "tags":[{"tagName":"fantasi"}]
// }
//send to create
// {
//     "title":"Mordor fan test",
//     "description":"new storie"
// }