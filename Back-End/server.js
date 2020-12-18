var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
const PORT = 8080;
const HOST = '10.10.11.84';
// var io = require('socket.io')(http);
const webSocketServer = require('websocket').server;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function (req, res) {
    res.json({
        "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
    });
});

require('./app/routes/users.routes.js')(app);
require('./app/routes/notifications.routes.js')(app);
require('./app/routes/friends.routes.js')(app);
require('./app/routes/chats.routes.js')(app);

http.listen(PORT, HOST, () => {
    console.log(`listening on *:${PORT}`);
});

const wsServer = new webSocketServer({
    httpServer: http
});

let users = {};

wsServer.on('request', function (request) {
    let phone = request.requestedProtocols[0];
    console.log('connected ', phone)
    const connection = request.accept(null, request.origin);
    users[phone] = connection;
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // connection.sendUTF(message.utf8Data);
            let messageObject = JSON.parse(message.utf8Data);
            if (users[messageObject.receiver]) {
                users[messageObject.receiver].sendUTF(message.utf8Data);
                console.log(messageObject);
            }
            else {
                console.log("user doesn't exist");
            }
        } else if (message.type === 'binary') {
            // connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' ' + connection.remoteAddress + ' disconnected.');
        delete users[phone];
    });
});
