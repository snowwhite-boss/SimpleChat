var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
const PORT = 8080;
const HOST = '10.10.11.84';
// var io = require('socket.io')(http);
const webSocketServer = require('websocket').server;


var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

require('./app/routes/users.routes.js')(app);
require('./app/routes/notifications.routes.js')(app);
require('./app/routes/friends.routes.js')(app);
require('./app/routes/chats.routes.js')(app);

http.listen(PORT, HOST, () => {
    console.log(`listening on *:${PORT}`);
});

/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});

const wsServer = new webSocketServer({
    httpServer: http
});

wsServer.on('request', function (request) {
    console.log('connected ', request.requestedProtocols)
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });    
});