module.exports = function (app) {

    var users = require('../controllers/users.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve a single Note with noteId
    app.get('/users/:phone', users.findOne);

}