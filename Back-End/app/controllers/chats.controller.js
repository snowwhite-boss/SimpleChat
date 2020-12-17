var User = require('../models/users.model.js');
var Notification = require("../models/notifications.model.js");
var Chat = require("../models/chats.model.js");

exports.create = async function (req, res) {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            message: "Note can not be empty..."
        });
    }
    const {
        sender,
        receiver,
        content
    } = req.body;
    if (!sender || sender == "" || !receiver || receiver == "" || !content || content == "") {
        return res.status(400).send({
            message: "Content can't be blank"
        });
    }
    let senderuser = await User.findOne({
        phone: sender
    });
    let receiveruser = await User.findOne({
            phone: receiver
        })
        .populate('notifications')
        .exec();
    if (!receiveruser || !senderuser) {
        return res.status(500).send({
            message: "User not found"
        });
    }

    let chat = new Chat({
        from: sender,
        to: receiver,
        content
    });
    chat = await chat.save();
    if (!chat) {
        return res.status(500).send({
            message: "Can't create chat"
        });
    }
    if (!receiveruser.notifications) {
        let notifications = new Notification({
            user: receiveruser._id,
            notifications: []
        });
        receiveruser.notifications = notifications;
        receiveruser.save();
    }

    let index = receiveruser.notifications.notifications.findIndex((notification) => (
        JSON.stringify(notification.senduser) == JSON.stringify(senderuser._id)
    ));
    if (index == -1) {
        receiveruser.notifications.notifications.push({
            senduser: senderuser._id,
            count: 1,
            content: content,
        });
    } else {
        receiveruser.notifications.notifications[index].count++;
        receiveruser.notifications.notifications[index].content = content;
    }
    receiveruser.notifications.save();
    res.send(chat);
}

exports.getlist = async function (req, res) {
    const {
        sender,
        receiver
    } = req.params;
    if (!sender || sender == "" || !receiver || receiver == "") {
        return res.status(400).send({
            message: "Content can't be blank"
        });
    }
    let senderuser = await User.findOne({
        phone: sender
    }).exec();
    let receiveruser = await User.findOne({
        phone: receiver
    }).exec();
    if (!receiveruser || !senderuser) {
        return res.status(500).send({
            message: "User not found"
        });
    }

    try {
        let chats = await Chat.find({
            $or: [{
                    'from': sender,
                    'to': receiver
                },
                {
                    'from': receiver,
                    'to': sender
                },
            ],
        }).sort({
            createdAt: 'desc'
        }).exec();
        return res.send(chats);
    } catch (error) {
        return res.status(500).send({
            message: "Chat not found"
        });
    }
}