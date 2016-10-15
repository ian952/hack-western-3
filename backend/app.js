var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

//services
var databaseService = require ('./services/database.js');
var yelpService = require ('./services/yelp.js');

var activeGroups = [];

http.listen(3000);

console.log ('Listening on 3000');

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
});

yelpService.search ('University of Western Ontario', '40000').then((data) => {
	yelpService.popularCategory (data);
});
	

io.on ('connection', function(socket){
	console.log ('connected');

	socket.on ('newuser', function(data, returnData){
		console.log (data.name + ' connected');
		databaseService.createPerson(data.name).then((id) => {
			console.log ('ID: ' + id);
			returnData(id);
		});
	});

	socket.on('create', function(data, returnData){
		console.log ('Create room');
		databaseService.createGroup(data.person_ID).then((groupId) => {
			console.log('groupID: ' + groupId);
			socket.join(groupId);
			returnData(groupId);
		})
	});

	socket.on ('join', function(data, returnData){
		console.log ('Join room');
		console.log (data);
		databaseService.joinGroup(data.person_ID, data.group_ID).then (() => {
			databaseService.getPersonsInGroup(data.group_ID).then((person_list) => {
				socket.join(data.group_ID);
				socket.broadcast.to(data.group_ID).emit('person_list', person_list);
				returnData();
			});
		});
	});

	/*
		activeGroups: {[
			group_ID:,
			current_question:,
			persons: [{
				person:,
				choices:[]
			}]
		]}
	*/

	socket.on('start',function(data){
		databaseService.getPersonsInGroup(data.group_ID).then((person_list) => {
			activeGroups.push({
				group_ID: data.group_ID,
				current_question: 1,
				persons: []
			});

			person_list.map((person) => {
				activeGroups[activeGroups.length - 1].persons.push({
					person: person.person_ID,
					choices: []
				});
			});



		});

		//yelp service
		//make function to gen question
	});

});