// const User = require('../models/Users');
const History = require('../models/Historys');
const errorHandler = require('../utils/errorHandler');

module.exports.getHistories = async function (req, res) {
    try {
        const histories = await History
            .sort({date: -1})
            .limit(20)
        res.status(200).json({histories, resultCode: 0})
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    try {
        const history = await new History({
            description: req.body.description,
            title: req.body.title,
            like: req.body.like,
            rating: req.body.rating,
            author: req.user,
            chapter: req.body.chapter,
        }).save();
        res.status(201).json({history, resultCode: 0})
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    const update = {
        description: req.body.description,
        title: req.body.title,
        like: req.body.like,
        rating: req.body.rating,
        tags: req.body.tags,
    };
    try {
        const history = await History.findeOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {new: true}
        );
        res.status(200).json({history, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updateChapter = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    const update = {
        body: req.body.body ? req.body.body : "",
        title: req.body.title ? req.body.title : "",
        imageSrc: req.file ? req.file.path : "",
    };
    try {
        const chapter = await history.chapters.findeOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {new: true}
        );
        res.status(200).json({chapter, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createChapter = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    const update = {
        chapter: [...history.chapter,
            {
                body: req.body.body ? req.body.body : "",
                title: req.body.title ? req.body.title : "",
                imageSrc: req.file ? req.file.path : "",
            }
        ]
    };
    try {
        const history = await History.findeOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {new: true}
        );
        res.status(201).json(history);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createComment = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    const update = {
        comments: [...history.comments,
            {
                body: req.body.body,
                user: req.body.user,
            }
        ]
    };
    try {
        const history = await History.findeOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {new: true}
        );
        res.status(200).json({history, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await History.remove({_id: req.params.historyId});
        res.status(200).json({
            message: "History deleted",
            resultCode: 0,
        });
    } catch (e) {
        errorHandler(res, e);
    }
};