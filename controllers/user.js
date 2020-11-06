const User = require('../models/Users');
const errorHandler = require('../utils/errorHandler');

module.exports.getByUserId = async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json({user, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getUsers = async function (req, res) {
    try {
        const users = await User.find();
        res.status(200).json({users, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json({user, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await User.remove({_id: req.params.userId});
        res.status(200).json({
            message: "User is deleted",
            resultCode: 0,
        });

    } catch (e) {
        errorHandler(res, e);
    }
};
