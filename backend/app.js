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

io.on ('connection', function(socket){
	console.log ('connected');
	socket.emit ('Hey');
	socket.on ('newuser', function(data){
		console.log (data.name + ' connected');

		var p = new Promise (resolve(databaseService.createPerson(data.name)))
		p.then (
			function (id) {
				socket.set('person_ID', id);
				io.emit (id);
			}
		);

	});

	socket.on ('create', function(data){
		console.log ('Create room');

		io.emit (databaseService.createGroup(data.person_ID));
	});

});