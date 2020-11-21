const History = require('../models/Histories');
const errorHandler = require('../utils/errorHandler');
const updateObj = require('../utils/objectHelpers');

module.exports.getHistories = async function (req, res) {
    try {
        const histories = await History
            .find({
                "rating.ratingNumber": {
                    $gte: 4,
                }
            })
            .sort({updateDate: -1})
            .limit(20);
        res.status(200).json({histories, resultCode: 0})
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getUserHistories = async function (req, res) {
    try {
        const histories = await History
            .find({
                "author.user": {
                    $eq: req.params.userId,
                }
            });
        res.status(200).json({histories, resultCode: 0})
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getHistory = async function (req, res) {
    try {
        const history = await History.findById(req.params.historyId);
        res.status(200).json({
            history,
            resultCode: 0
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    try {
        const history = await new History({
            description: req.body.description ? req.body.description : "here will be a description",
            title: req.body.title ? req.body.title : "here will be the title",
            author: {
                user: req.user._id,
                userName: req.body.userName,
            },
            like: {
                likeNumber: 0,
                likedUsers: [],
            },
            rating: {
                ratingAddUsers: [],
                ratingNumber: 0,
            },
            chapters: [],
            comments: [],
        }).save();
        res.status(201).json({history, resultCode: 0})
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    const update = {
        description: req.body.description ? req.body.description : history.description,
        title: req.body.title ? req.body.title : history.title,
        like: updateObj.updateLike(req.user, history.like.likeNumber,
            history.like.likedUsers, req.body.like),
        rating: updateObj.updateRate(req.user, history.rating.ratingNumber,
            history.rating.ratingAddUsers, req.body.rating),
        tags: req.body.tags ? req.body.tags : history.tags,
        author: req.body.author ? req.body.author : history.author,
    };
    try {
        const history = await History.findOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.status(200).json({history, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updateAuthor = async function (req, res) {
    const update = {
        author: {
            userName: req.body.name,
            user: req.body.userId,
        },
    };
    try {
        const histories = await History.updateMany(
            {
                "author.user": {
                    $eq: req.body.userId,
                }
            },
            {$set: update}
        );
        res.status(200).json({histories, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updateChapter = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    const update = {
        description: history.description,
        title: history.title,
        like: history.like,
        rating: history.rating,
        author: history.author,
        tags: history.tags,
        chapters: updateObj.updateChapter(req.body.chapterId, history.chapters, req.body, req.file),
    };
    try {
        const history = await History.findOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.status(200).json({history, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createChapter = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    let update;
    if (history.chapters) {
        update = {
            chapters: [...history.chapters,
                {
                    body: req.body.body ? req.body.body : "",
                    title: req.body.title ? req.body.title : "",
                    imageSrc: req.file ? req.file.location : "",
                }
            ]
        };
    } else {
        update = {
            chapters: [
                {
                    body: req.body.body ? req.body.body : "",
                    title: req.body.title ? req.body.title : "",
                    imageSrc: req.file ? req.file.location : "",
                }
            ]
        };
    }
    try {
        const history = await History.findOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.status(201).json({history, resultCode: 0});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createComment = async function (req, res) {
    const history = await History.findById(req.params.historyId);
    let update;
    if (history.comments) {
        update = {
            updateDate: Date.now,
            comments: [...history.comments,
                {
                    body: req.body.body,
                    user: req.body.user,
                }
            ]
        }
    } else {
        update = {
            updateDate: Date.now,
            comments: [{
                body: req.body.body,
                user: req.body.user,
            }]
        }
    }
    try {
        const history = await History.findOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
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

module.exports.removeChapter = async function (req, res) {
    try {
        let history = await History.findById(req.params.historyId);
        let chapters = [];
        history.chapters.map(i => {
            let j = i._id.toString();
            if (j !== req.params.chapterId) {
                chapters.push(i)
            }
        });
        let update = {
            chapters: chapters,
        };
        history = await History.findOneAndUpdate(
            {_id: req.params.historyId},
            {$set: update},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.status(200).json({
            history,
            message: "Chapter deleted",
            resultCode: 0,
        });
    } catch (e) {
        errorHandler(res, e);
    }
};