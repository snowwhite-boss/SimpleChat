var User = require('../models/users.model.js');

exports.create = function (req, res) {
    // Create and Save a new Note
    
    if (!req.body) {
        return res.status(400).send({ message: "Note can not be empty..." });
    }

    var user = new User({ 
        name: req.body.name || "Untitled User", 
        phone: req.body.phone,
        friends: req.body.friends 
    });

    user.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the User." });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    

    User.find(function (err, notes) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving notes." });
        } else {
            res.send(notes);
        }
    });
};

exports.findOne = function (req, res) {
    // Find a single user with a phone
    User.findOne({"phone":req.params.phone}, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.noteId });
        } else {
            res.send(data);
        }
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    User.findById(req.params.noteId, function (err, note) {
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

exports.delete = function (req, res) {
    // Delete a note with the specified noteId in the request
    User.remove({ _id: req.params.noteId }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete note with id " + req.params.id });
        } else {
            res.send({ message: "User deleted successfully!" })
        }
    });
};

