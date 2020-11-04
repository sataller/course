const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
        users: [
            {
                name: {
                    type: String,
                    default:"guest",
                },
                status: {
                    type: Boolean,
                    default: true,
                },
                registerDate: {
                    type: Date,
                    default:Date.now,
                },
                email: {
                    type: String,
                    lowercase: true,
                    required: true,
                    unique: true,
                },
                password: {
                    type: String,
                    required: true,
                },
            }
        ],
    })
;

module.exports = mongoose.model('users', usersSchema);