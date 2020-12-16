var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    },
    notifications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);