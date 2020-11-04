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
        chapters: [
            {
                body: {
                    type: String,
                    default: "",
                },
                title: {
                    type: String,
                    default: "",
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
                    required: true,
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
    })
;

module.exports = mongoose.model('stories', storiesSchema);