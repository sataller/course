const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        like: {
            likeNumber: {
                type: Number,
                default: 0,
            },
            likedUsers: [
                {
                    ref: 'users',
                    type: Schema.Types.ObjectId,
                }
            ]
        },
        rating: {
            ratingNumber: {
                type: Number,
                default: 0,
            },
            ratingAddUsers: [
                {
                    user: {
                        ref: 'users',
                        type: Schema.Types.ObjectId
                    },
                    rating: {
                        type: Number,
                        required: true,
                    }
                }
            ]
        },
        chapters: [
            {
                body: {
                    type: String,
                    required:true,
                },
                title: {
                    type: String,
                    required:true,
                },
                imageSrc: {
                    type: String,
                    default: "",
                }
            }
        ],
        author: {
            ref: 'users',
            type: Schema.Types.ObjectId,
        },
        tags: [
            {
                tagName: {
                    type: String,
                    default: "Tap to add tags",
                },
            }
        ],
        comments: [
            {
                body: {
                    type: String,
                    required: true,
                },
                user: {
                    ref: 'users',
                    type: Schema.Types.ObjectId,
                }
            }
        ],
        updateDate: {
            type: Date,
            default: Date.now,
        },
    })
;

module.exports = mongoose.model('stories', storiesSchema);