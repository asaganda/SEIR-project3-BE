const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {type: String, unique: true, require: true},
    password: {type: String, required: true},
    profileImg: {type: String, default: "https://freesvg.org/img/abstract-user-flat-4.png"},
    email: {type: String, required: true},
    followers: [String],
    following: [String]
});

const User =mongoose.model('User', userSchema);
module.exports = User;