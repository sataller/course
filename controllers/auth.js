const bcrypt = require('bcryptjs')
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const mailer = require('../middleware/nodemailer');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const condidate = await User.findOne({email: req.body.email});
    console.log(condidate.confirm);
    if (condidate) {
        if (condidate.confirm) {
            const passwordResult = bcrypt.compareSync(req.body.password, condidate.password);
            if (passwordResult) {
                const token = jwt.sign({
                    name: condidate.name,
                    role: condidate.role,
                    them: condidate.them,
                    userId: condidate._id
                }, keys.jwt, {expiresIn: 60 * 60});
                res.status(200).json({
                    token: `Bearer ${token}`,
                    resultCode: 0,
                });
            } else {
                res.status(401).json({
                    message: "Email or password incorrect",
                    resultCode: 1,
                });
            }
        } else {
            res.status(401).json({
                confirm: false,
                message: "You need to confirm your email address",
                resultCode: 1,
            });
        }
    } else {
        res.status(404).json({
            message: "Email or password incorrect",
            resultCode: 1,
        });
    }
};

module.exports.register = async function (req, res) {
    const condidate = await User.findOne({email: req.body.email});
    if (condidate) {
        res.status(409).json({message: "Email is busy", resultCode: 1});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(password, salt),
        });
        const mailOptions = {
            to: req.body.email,
            subject: 'You have successfully registered on the site',
            html: `
    <h2>You have successfully registered on the site</h2>
    <span>Now you need to confirm your email address. To confirm, click
     <a href="http://127.0.0.1:5000/auth/confirm/${user._id}">
     here
      </a>
      </span>
    <p>You don't need to respond to this email</p>
    `
        };
        try {
            await user.save();
            mailer.mailer(mailOptions);
            res.status(201).json({
                user,
                message: "You need to confirm your email address. Check your email. ",
                resultCode: 0
            })
        } catch (e) {
            errorHandler(res, e);
        }
    }
};

module.exports.logout = async function (req, res) {

};

module.exports.confirm = async function (req, res) {
    const update = {
        confirm: true,
    };
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.status(201).json({user, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};