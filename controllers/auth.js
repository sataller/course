const bcrypt = require('bcryptjs')
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const condidate = await User.findOne({email: req.body.email});
    if (condidate) {
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
                message: "Email or password incorrect"
            });
        }
    } else {
        res.status(404).json({
            message: "Email or password incorrect"
        });
    }
};
module.exports.register = async function (req, res) {

    const condidate = await User.findOne({email: req.body.email});
    if (condidate) {
        res.status(409).json({message: "Email is busy"});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(password, salt),
        });
        try {
            await user.save();
            res.status(201).json({
                user,
                resultCode: 0
            })
        } catch (e) {
            errorHandler(res, e);
        }
    }
};