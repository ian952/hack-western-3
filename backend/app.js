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

http.listen(process.env.PORT || 3000);

console.log ('Listening on 3000');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
});

//tests
if (process.env.TEST == '1') {
	var test_group = {
		persons: [
		{person_ID:1, answers:['Proximity']},
		{person_ID:2, answers:['Rating']}
		]
	};
		
	yelpService.setup ('University of Western Ontario', 5000).then(() => {
		yelpService.genQuestion (2, test_group).then((question) => {
			//socket.broadcast.to(data.group_ID).emit('question',question);
			console.log (2);
			console.log (question);
		});
	});

	var test_group = {
		persons: [
		{person_ID:1, answers:['Proximity','Sandwiches']},
		{person_ID:2, answers:['Rating', 'Pubs']}
		]
	};
		
	yelpService.setup ('University of Western Ontario', 5000).then(() => {
		yelpService.genQuestion (3, test_group).then((question) => {
			//socket.broadcast.to(data.group_ID).emit('question',question);
			console.log (3);
			console.log (question);
		});
	});

	var test_group = {
		persons: [
		{person_ID:1, answers:['Proximity','Sandwiches','Korean']},
		{person_ID:2, answers:['Rating', 'Pubs','Chinese']}
		]
	};
		
	yelpService.setup ('University of Western Ontario', 5000).then(() => {
		yelpService.genQuestion (4, test_group).then((question) => {
			//socket.broadcast.to(data.group_ID).emit('question',question);
			console.log (4);
			console.log (question);
		});
	});

	setTimeout(function() {
		var test_group = {
			persons: [
			{person_ID:1, answers:['Proximity','Sandwiches','Italian','Burgers']},
			{person_ID:2, answers:['Rating', 'Pubs','Chinese', 'Italian']}
			]
		};
		yelpService.setup ('University of Western Ontario', 5000).then(() => {
			yelpService.genQuestion (5, test_group).then((question) => {
				//socket.broadcast.to(data.group_ID).emit('question',question);
				console.log (5);
				console.log (question);
			});
		});
	}, 2000);
}
//end tests

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

	socket.on('join', function(data, returnData){
		console.log ('Join room');
		console.log (data);
		databaseService.joinGroup(data.person_ID, data.group_ID).then (() => {
			databaseService.getPersonsInGroup(data.group_ID).then((person_list) => {
				socket.join(data.group_ID);
				socket.broadcast.to(data.group_ID).emit('person_list', person_list);
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

		For Q 5 - 11
		answers contain objects: {
			rating_img_url: 
			name:
			categories:[]
			img_url: 
		}

		For Q 12
		question: {
			done: true,
			question: 'done',
			answers: [the restaurant object]
		}
	*/

	socket.on('start',function(data, callbackData){
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
				console.log(question);
				callbackData(question);
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

	socket.on('answer', function(data, dataCallback) {
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
				dataCallback(question);
			});
		} else {
			var peoples_answers = [];
			selected_group.persons.map ((person) => {
				if (person.answers.length == selected_group.current_question) {
					peoples_answers.push ({
						person_ID: person.person_ID,
						answer: person.answers[selected_group.current_question-1]
					});
				}
			});
			socket.broadcast.to(data.group_ID).emit('submittedanswers', peoples_answers);
			dataCallback(null);
		}

	});

});