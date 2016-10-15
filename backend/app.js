var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

//services
var databaseService = require ('./services/database.js');

var activeGroups = [];

http.listen(3000);

console.log ('Listening on 3000');

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
});

io.on ('connection', function(socket){
	console.log ('connected');

	socket.on ('newuser', function(data, fn){
		console.log (data.name + ' connected');
		databaseService.createPerson(data.name).then((id) => {
			console.log ('ID: ' + id);
			fn(id);
		});
	});

	socket.on('create', function(data, fn){
		console.log ('Create room');
		databaseService.createGroup(data.person_ID).then((groupId) => {
			console.log('groupID: ' + groupId);
			fn(groupId);
		})
	});

	socket.on ('join', function(data){
		console.log ('Join room');

		databaseService.joinGroup(data.person_ID, data.group_ID).then (() => {
			databaseService.getPersonsInGroup(data.group_ID).then ((person_list) => {
				io.emit('person_list', person_list);
			});
		});
	});

	socket.on('start',function(data){

	});

});