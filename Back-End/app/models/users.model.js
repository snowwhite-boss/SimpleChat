var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    friends: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
