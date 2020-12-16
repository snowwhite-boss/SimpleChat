var mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
    senduser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiveuser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ''
    },
    IsSticky: {
        type: Boolean,
        default: false
    },
    IsNotify: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);