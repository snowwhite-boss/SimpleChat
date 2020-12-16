var mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    notifications: [{
        senduser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
        isSticky: {
            type: Boolean,
            default: false
        },
        isNotify: {
            type: Boolean,
            default: true
        }
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);