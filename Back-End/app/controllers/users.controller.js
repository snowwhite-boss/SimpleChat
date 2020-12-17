var User = require('../models/users.model.js');
var Friend = require("../models/friends.model.js");
var Notification = require("../models/notifications.model.js");

exports.create = async function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Note can not be empty..."
        });
    }
    const {
        name,
        phone
    } = req.body;
    if (!name || name == '' || !phone || phone == '') {
        return res.status(400).send({
            message: "User Name is required"
        });
    }
    User.findOne({
            phone
        })
        .populate({
            path: 'friends',
            select: 'friends',
            populate: {
                path: 'friends',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name phone',
                }
            }
        })
        .populate({
            path: 'notifications',
            select: 'notifications',
            populate: {
                path: 'notifications',
                select: 'count content isSticky isNotify',
                populate: {
                    path: 'senduser',
                    select: "name phone"
                }
            }
        })
        .exec(function (error, data) {
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
                    let friends = new Friend({
                        user: data._id,
                        friends: []
                    });
                    friends.save();

                    let notifications = new Notification({
                        user: data._id,
                        notifications: []
                    });
                    notifications.save();

                    user.friends = friends;
                    user.notifications = notifications;
                    user.save();
                    res.send(user);
                }
            });
        });
};

exports.findOne = function (req, res) {
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