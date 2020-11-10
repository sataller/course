const express = require('express');
const mongoose = require('mongoose');
const authRotes = require('./routes/auth');
const historyRotes = require('./routes/history');
const userRotes = require('./routes/user');
const keys = require('./config/keys');
const passport = require('passport');
const app = express();

mongoose.connect(keys.mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('D/s/coursProject/course/src/assets', express.static('uploads'))
app.use(express.json());

app.use('/auth', authRotes);
app.use('/history', historyRotes);
app.use('/users', userRotes);

module.exports = app;
