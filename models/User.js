const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: 0
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
