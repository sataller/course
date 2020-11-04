const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
        users: [
            {
                email: {
                    type: String,
                    lowercase: true,
                    required: true,
                    unique: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                },
                status: {
                    type: Boolean,
                    default:
                        true,
                },
                registerDate: {
                    type: Date,
                    default:
                    Date.now,
                },
                // user:{
                //     ref:'users',
                //     type: Schema.Types.ObjectId,
                // }
            }
        ],
    })
;

module.exports = mongoose.model('users', usersSchema);