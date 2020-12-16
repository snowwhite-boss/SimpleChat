var User = require('../models/users.model.js');
var Friend = require("../models/friends.model.js");

exports.create = function (req, res) {
    // Create and Save a new Note

    if (!req.body) {
        return res.status(400).send({
            message: "Note can not be empty..."
        });
    }
    const {
        name,
        phone
    } = req.body;
    if (!name || name == '') {
        res.status(400).send({
            message: "User Name is required"
        });
        return;
    }
    if (!phone || phone == '') {
        res.status(400).send({
            message: "Phone Number is required"
        });
        return;
    }
    User.findOne({
        phone
    }, function (error, data) {
        if (error) {
            res.status(500).send({
                message: "Some error occurred while getting the User."
            });
            return;
        }
        if (data) {
            res.send(data);
            return;
        }
        var user = new User({
            name: name,
            phone: phone,
        });
        user.save(function (err, data) {
            if (err) {
                console.log(JSON.stringify(err));
                res.status(500).send({
                    message: "Some error occurred while creating the User."
                });
            } else {
                friends = new Friend({
                    user: data._id,
                    friends: []
                });
                res.send(data);
            }
        });
    });

};

exports.findOne = function (req, res) {
    // Find a single user with a phone
    User.findOne({
        "phone": req.params.phone
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Could not retrieve note with id " + req.params.noteId
            });
        } else {
            res.send(data);
        }
    });
};