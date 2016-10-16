var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

//services
var databaseService = require ('./services/database.js');
var yelpService = require ('./services/yelp.js');

var activeGroups = [];

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

http.listen(3000);

console.log ('Listening on 3000');

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
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
				socket.broadcast.to(data.group_ID).emit('person_list', person_list);å
				returnData(person_list);
			});
		});
	});

	/*
		activeGroups: {[
			group_ID:,
			current_question:,
			persons: [{
				person_ID:,
				answers:[]
			}]
		]}

		question: {
			done:,
			question:,
			answers:[]
		}
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
					person_ID: person.person_ID,
					answers: []
				});
			});

		});

		yelpService.setup (data.location, data.radius).then(() => {
			yelpService.genQuestion (1).then((question) => {
				socket.broadcast.to(data.group_ID).emit('question',question);
			});
		});

	});

	/*
		data: {
			group_ID:
			person_ID
			answer:
		}
	*/

	socket.on ('answer', function(data) {
		var selected_group = activeGroups.find((group) => group.group_ID == data.group_ID)
		var selected_person = selected_group.persons.find((person) => person.person_ID == data.person_ID);

		if (selected_person.answers.length == selected_group.current_question) {
			selected_person.answers[selected_group.current_question-1] = data.answer;
		} else {
			selected_person.answers.push(data.answer);
		}

		if (selected_group.persons.find ((person) => person.answers.length < selected_group.current_question) == undefined) {
			selected_group.current_question ++;

			yelpService.genQuestion(selected_group.current_question, selected_group).then ((question) => {
				if (question.done) {
					activeGroups.remove(activeGroups.indexOf(selected_group));
				}
				socket.broadcast.to(data.group_ID).emit('question',question);
			});
		}

	});

});