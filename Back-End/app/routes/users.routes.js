module.exports = function (app) {

    var users = require('../controllers/users.controller.js');

    // {
    //     "name": "Name",
    //     "phone": "phone number"
    // }
    app.post('/users', users.create);
    app.get('/users/:phone', users.findOne);

}