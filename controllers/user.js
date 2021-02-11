const User = require('../models/Users');
const errorHandler = require('../utils/errorHandler');
const updateObj = require('../utils/objectHelpers');

module.exports.getByUserId = async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                status: user.status,
                email: user.email,
                role: user.role,
                them: user.them,
                confirm: user.confirm,
                registerDate: user.registerDate,
                description: user.description,
            },
            resultCode: 0
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getUsers = async function (req, res) {
    try {
        let users = await User.find();
        users = users.map(i => {
                return ({
                    name: i.name,
                    status: i.status,
                    email: i.email,
                    role: i.role,
                    them: i.them,
                    confirm: i.confirm,
                    registerDate: i.registerDate,
                    description: i.description,
                    id: i._id,
                })
            }
        );
        res.status(200).json({users, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    const user = await User.findById(req.params.userId);
    const update = {
        name: req.body.name ? req.body.name : user.name,
        status: updateObj.updateUserStatus(user.status, req.body.status),
        email: req.body.email ? req.body.email : user.email,
        password: req.body.password ? req.body.password : user.password,
        role: req.body.role ? req.body.role : user.role,
        them: req.body.them ? req.body.them : user.them,
        description: req.body.description?req.body.description:user.description,
        confirm: user.confirm,
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
        res.status(200).json({
            user: {
                name: user.name,
                status: user.status,
                email: user.email,
                role: user.role,
                them: user.them,
                confirm: user.confirm,
                registerDate: user.registerDate,
                description:user.description,
                id: user._id,
            }, resultCode: 0
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await User.remove({_id: req.body.userId});

        res.status(200).json({
            message: "User is deleted",
            resultCode: 0,
        });

    } catch (e) {
        errorHandler(res, e);
    }
};
