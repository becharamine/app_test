var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

//Connection event handler
io.sockets.on('connection', function (socket) {
    socket.on('checkName', function(nom){
        socket.nom = nom;
        console.log(nom+'');
        socket.broadcast.emit('connectionMessage', nom); 

    });

    var callback = function(message){
        socket.broadcast.emit('message', socket.nom, message);
    };
    socket.on('sendMessage', callback);
});


server.listen(8086);