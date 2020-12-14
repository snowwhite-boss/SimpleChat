var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    friends: Array,
    notificaions:Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
