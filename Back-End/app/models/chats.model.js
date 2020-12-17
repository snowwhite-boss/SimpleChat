var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);