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

	socket.on ('newuser', function(data){
		console.log (data.name + ' connected');

		var p = new Promise (
			function (resolve, reject) {
				resolve(databaseService.createPerson(data.name))
		})
		p.then (
			function (id) {
				socket.set('person_ID',{person_ID: id});
				io.emit (id);
			}
		);

	});

	socket.on ('create', function(data){
		console.log ('Create room');

		io.emit ('group_ID',{group_ID:databaseService.createGroup(data.person_ID)});
	});

	socket.on ('join', function(data){
		console.log ('Join room');

		var p = new Promise (
			function (resolve) {
				resolve (databaseService.joinGroup (data.person_ID, data.group_ID));
			});
		p.then (function (){
			var pp = new Promise (function(resolve){
					resolve (databaseService.joinGroup(data.person_ID, data.group_ID));
			});
			pp.then (function() {
				io.emit('person_list', databaseService.getPersonsInGroup(data.group_ID));
			});
		});
	});

	socket.on('start',function(data){
		
	});

});