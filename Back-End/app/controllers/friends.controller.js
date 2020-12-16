var User = require('../models/users.model.js');
var Friend = require("../models/friends.model.js");

exports.create = async function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Friend can not be empty..."
        });
    }
    const {
        requesterphone,
        receiverphone
    } = req.body;
    if (!requesterphone || requesterphone == '') {
        res.status(400).send({
            message: "Phone Number is required"
        });
        return;
    }
    if (!receiverphone || receiverphone == '') {
        res.status(400).send({
            message: "Phone Number is required"
        });
        return;
    }

    let requester = await User.findOne({
        phone: requesterphone
    }).exec();
    if (!requester) {
        res.status(500).send({
            message: "User doesn't exist"
        });
        return;
    }

    let receiver = await User.findOne({
        phone: receiverphone
    }).exec();
    if (!receiver) {
        res.status(500).send({
            message: "User doesn't exist"
        });
        return;
    }
    // waiting
    let requester_friend = await Friend.findOne({
        user: requester._id,
    }).exec();
    if (!requester_friend) {
        var friend = new Friend({
            user: requester._id,
            friends: []
        });
        requester_friend = friend;
    }
    //view
    let receiver_friend = await Friend.findOne({
        user: receiver._id,
    }).exec();
    if (!receiver_friend) {
        var friend = new Friend({
            user: receiver._id,
            friends: []
        });
        receiver_friend = friend;
    }

    try {
        let result = requester_friend.friend.find((friend) => JSON.stringify(friend.user) == JSON.stringify(receiver._id));
        if (!result) {
            requester_friend.friend.push({
                user: receiver._id,
                status: 'waiting'
            });
            await requester_friend.save();
            requester.friend = requester_friend;
            requester.save();
        }
    } catch (error) {
        res.status(500).send({
            message: "Can't create friendship."
        });
        return;
    }

    try {
        if (!receiver_friend.friend.find((friend) => JSON.stringify(friend.user) == JSON.stringify(requester._id))) {
            receiver_friend.friend.push({
                user: requester._id,
                status: 'view'
            })
            await receiver_friend.save();
            receiver.friend = receiver_friend;
            receiver.save();
        }
    } catch (error) {
        res.status(500).send({
            message: "Can't create friendship."
        });
        return;
    }

    res.send("Successfully added");
};

exports.update = async function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Friend can not be empty..."
        });
    }
    const {
        requesterphone,
        receiverphone
    } = req.body;
    if (!requesterphone || requesterphone == '') {
        res.status(400).send({
            message: "Phone Number is required"
        });
        return;
    }
    if (!receiverphone || receiverphone == '') {
        res.status(400).send({
            message: "Phone Number is required"
        });
        return;
    }

    let requester = await User.findOne({
        phone: requesterphone
    }).exec();
    if (!requester) {
        res.status(500).send({
            message: "User doesn't exist"
        });
        return;
    }

    let receiver = await User.findOne({
        phone: receiverphone
    }).exec();
    if (!receiver) {
        res.status(500).send({
            message: "User doesn't exist"
        });
        return;
    }

    // waiting
    let requester_friend = await Friend.findOne({
        user: requester._id,
    }).exec();

    if (!requester_friend) {
        res.status(500).send({
            message: "Friendship doesn't exist"
        });
        return;
    }
    //view
    let receiver_friend = await Friend.findOne({
        user: receiver._id,
    }).exec();
    if (!receiver_friend) {
        res.status(500).send({
            message: "Friendship doesn't exist"
        });
        return;
    }

    try {
        let changed = false;
        requester_friend.friend = requester_friend.friend.map((friend) => {
            if (JSON.stringify(friend.user) == JSON.stringify(receiver._id)) {
                changed = true;
                friend.status = 'added'
            };
            return friend;
        });
        if (!changed) {
            res.status(500).send({
                message: "Friendship doesn't exist"
            });
            return;
        }
        await requester_friend.save();
    } catch (error) {
        console.log('error');
        res.status(500).send({
            message: "Friendship doesn't exist"
        });
        return;
    }

    try {
        let changed = false;
        receiver_friend.friend = receiver_friend.friend.map((friend) => {
            if (JSON.stringify(friend.user) == JSON.stringify(requester._id)) {
                changed = true;
                friend.status = 'added'
            };
            return friend;
        });
        if (!changed) {
            res.status(500).send({
                message: "Friendship doesn't exist"
            });
            return;
        }
        await receiver_friend.save();
    } catch (error) {
        console.log('error');
        res.status(500).send({
            message: "Friendship doesn't exist"
        });
        return;
    }

    res.send("Friendship is set.");
}