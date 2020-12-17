module.exports = function (app) {

    var chats = require('../controllers/chats.controller.js');

    // app.get('/chats/:sender/:receiver', chats.getlist);

    // {
    //     "requesterphone": "+7403434343434",
    //     "receiverphone": "+7403434343435"
    // }
    app.post('/chats', chats.create);
}