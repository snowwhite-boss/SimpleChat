module.exports = function(app) {

    var users = require('../controllers/users.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all Notes
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);
    
    // Retrieve a single Note with noteId
    app.get('/users/:phone', users.findOne);

    // Update a Note with noteId
    app.put('/users/:noteId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:noteId', users.delete);
}