const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', controller.logout);
router.get('/confirm/:userId', controller.confirm);

module.exports = router;

// {
//     "description":"!!!!!!!!Test history update",
//     "title":"chapter change",
//     "likeNumber":4,
//     "rating":{
// },
//     "tags":[{"tagName":"fantasi"}]
// }
// Register localhost:5000/auth/register
// {
//     "email":"testUser@mail.ru",
//     "name":testUser"",
//     "password":"testUser"
// }
//Auth localhost:5000/auth/login
// {
//     "email":"admin@mail.ru",
//     "password":"admin"
// }
//
// Sign Out localhost:5000/auth/logout
// Get user or delet user localhost:5000/users/:userId
// testUser userId to headers: 5fa5504b4acf2236a8824472
//
//Get oll users to admin localhost:5000/users/
//
// Get new histories or create history localhost:5000/history/
//{
// description: req.body.description,
// title: req.body.title,
// author: req.user,
// }
//
// Get, update or delete history localhost:5000/history/:historyId
// historyId to headers: _____
//
//{
//"description": "test description update",
//  "title": "test title update",
//    "like": {
// "likeNumber": "3",
//          "likedUsers":"userId1"
// },
//      rating: req.body.rating,
//        tags: req.body.tags,
// }
//
// Create new chapter in history localhost:5000/history/:historyId/chapter
//
//
//Update chapter in history localhost:5000/history/:historyId/:chapterId
//
//Add comment to history localhost:5000/history/:historyId/comments
//
// {
//       "description":"Test history description",
//             "title":"Test chapter",
//             "like":0,
//             "rating":0,
//             "author":"5fa2af27867a6a0a88513d93"
// }