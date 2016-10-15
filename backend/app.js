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

		var p = new Promise (
			function (resolve) {
				resolve (databaseService.joinGroup(data.person_ID, data.group_ID));
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