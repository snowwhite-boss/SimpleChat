var Notification = require('../models/notifications.model.js');

exports.findOne = function (req, res) {
    // Find a single notification with a phone
    Notification.findOne({"phone":req.params.phone}, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.noteId });
        } else {
            res.send(data);
        }
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    Notification.findById(req.params.noteId, function (err, note) {
        if (err) {
            res.status(500).send({ message: "Could not find a note with id " + req.params.noteId });
        }

        note.title = req.body.title;
        note.content = req.body.content;

        note.save(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update note with id " + req.params.noteId });
            } else {
                res.send(data);
            }
        });
    });
};
