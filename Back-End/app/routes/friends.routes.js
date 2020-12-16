module.exports = function (app) {

    var friends = require('../controllers/friends.controller.js');

    // {
    //     "requesterphone": "+7403434343434",
    //     "receiverphone": "+7403434343435"
    // }
    app.post('/friends', friends.create);

    // {
    //     "requesterphone": "+7403434343434",
    //     "receiverphone": "+7403434343435"
    // }
    app.put('/friends', friends.update);
}