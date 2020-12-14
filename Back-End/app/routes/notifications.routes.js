module.exports = function(app) {

    var notifications = require('../controllers/notifications.controller.js');

    // Create a new Note
    app.post('/notifications', notifications.create);

    // Retrieve all Notes
    app.get('/notifications', notifications.findAll);

    // Retrieve a single Note with noteId
    app.get('/notifications/:phone', notifications.findOne);

    // Update a Note with noteId
    app.put('/notifications/:noteId', notifications.update);

    // Delete a Note with noteId
    app.delete('/notifications/:noteId', notifications.delete);
}