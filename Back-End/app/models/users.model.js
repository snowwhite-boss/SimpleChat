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
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);