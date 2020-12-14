var mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
    name: String,
    phone: String,
    count: {type:Number, default:0},
    sentence: {type:String, default:''},
    IsSticky: {type:Boolean, default:false},
    IsNotify: {type:Boolean, default:true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
