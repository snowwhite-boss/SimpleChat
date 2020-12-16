module.exports = function (app) {

    var friends = require('../controllers/friends.controller.js');

    // Create a new Note
    app.post('/friends', friends.create);

    // Retrieve a single Note with noteId
    // app.put('/friends', users.findOne);

}