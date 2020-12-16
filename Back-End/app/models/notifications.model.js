var mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
    phone: String,
    notifications: [{
        name: String,
        phone: String,
        count: { type: Number, default: 0 },
        content: { type: String, default: '' },
        IsSticky: { type: Boolean, default: false },
        IsNotify: { type: Boolean, default: true }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
