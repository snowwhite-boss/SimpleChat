module.exports = function (app) {

    var chats = require('../controllers/chats.controller.js');

    app.get('/chats/:sender/:receiver', chats.getlist);

    // {
    //     "sender": "+7403434343434",
    //     "receiver": "+7403434343435",
    //     "content": "Chat Content"
    // }
    app.post('/chats', chats.create);
}