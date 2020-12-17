var Notification = require('../models/notifications.model.js');
var User = require('../models/users.model.js');

exports.update = async function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Note can not be empty..."
        });
    }
    const {
        sender,
        receiver,
        isNotify,
        isSticky,
    } = req.body;
    if (!sender || sender == "" || !receiver || receiver == "") {
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
            count: 0,
            content: "",
            isNotify: isNotify == undefined ? true : isNotify,
            isSticky: isSticky == undefined ? false : isSticky,
        });
    } else {
        receiveruser.notifications.notifications[index].count = 0;
        receiveruser.notifications.notifications[index].content = "";
        receiveruser.notifications.notifications[index].isNotify =
            isNotify == undefined ? receiveruser.notifications.notifications[index].isNotify : isNotify;
        receiveruser.notifications.notifications[index].isSticky =
            isSticky == undefined ? receiveruser.notifications.notifications[index].isSticky : isSticky;
    }
    receiveruser.notifications.save();
    res.send("Notificaion updated");;
};