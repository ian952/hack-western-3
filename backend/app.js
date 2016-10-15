var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

//services
var databaseService = require ('./services/database.js');


http.listen(3000);

console.log ('Listening on 3000');

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
});

io.on ('room', function(socket){
	socket.on ('newuser', function(data){
		console.log (data.name + ' connected');

		io.emit(databaseService.createPerson(data.name));
	});

	socket.on ('create', function(data){

	});
});