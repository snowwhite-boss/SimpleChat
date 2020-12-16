module.exports = function(app) {

    var notifications = require('../controllers/notifications.controller.js');

    app.get('/notifications/:phone', notifications.findOne);
    app.put('/notifications/:phone', notifications.update);

}