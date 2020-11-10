const User = require('../models/Users');
const errorHandler = require('../utils/errorHandler');

module.exports.getByUserId = async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json({
            user: {
                name: user.name,
                status: user.status,
                email: user.email,
                role: user.role,
                them: user.them,
                confirm: user.confirm,
                registerDate: user.registerDate,
            },
            resultCode: 0
        });
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
    const user = await User.findById(req.params.userId);
    const update = {
        name: req.body.name ? req.body.name : user.name,
        status: req.body.status ? req.body.status : user.status,
        email: req.body.email ? req.body.email : user.email,
        password: req.body.password ? req.body.password : user.password,
        role: req.body.role ? req.body.role : user.role,
        them: req.body.them ? req.body.them : user.them,
        confirm: user.confirm,
    };
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: update},
            {new: true}
        );
        res.status(200).json({
            user: {
                name: user.name,
                status: user.status,
                email: user.email,
                role: user.role,
                them: user.them,
                confirm: user.confirm,
                registerDate: user.registerDate,
            }, resultCode: 0
        });
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
