var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    phone: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
