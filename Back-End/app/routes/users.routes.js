module.exports = function (app) {

    var users = require('../controllers/users.controller.js');

    app.post('/users', users.create);
    app.get('/users/:phone', users.findOne);

}