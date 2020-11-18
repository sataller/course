const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet')
const path = require('path');
const authRotes = require('./routes/auth');
const historyRotes = require('./routes/history');
const userRotes = require('./routes/user');
const keys = require('./config/keys');
const app = express();

app.use(
    // [
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'https://checkout.stripe.com'],
            frameSrc: ["'self'", 'https://checkout.stripe.com'],
            childSrc: ["'self'", 'https://checkout.stripe.com'],
            scriptSrc: ["'self'", 'https://checkout.stripe.com'],
            styleSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                'https://checkout.stripe.com',
            ],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
            baseUri: ["'self'"],
        },
    })
    // ]
)

const url = process.env.MONGO_URL || keys.mongoURI;
mongoose.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('https://s3.console.aws.amazon.com/s3/buckets/courseprojectbucket?region=eu-central-1&tab=objects',
    express.static('uploads'));
app.use(express.json());

app.use('/api/auth', authRotes);
app.use('/api/history', historyRotes);
app.use('/api/users', userRotes);

if (process.env.NODE_ENV === "production"){
app.use('/', express.static(path.join( 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client', 'build', 'index.html'));
});
}
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'client/build', 'index.html'));
// });

module.exports = app;
