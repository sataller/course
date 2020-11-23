const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: keys.nodeMailer.name,
            pass: keys.nodeMailer.password,
        },
        tls: {
            rejectUnauthorized: false
        },
    },
    {
        from: keys.nodeMailer.name,
    });

module.exports.mailer = mailOptions => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};