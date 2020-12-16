var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
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