var express = require('express');
var http = require('http');

var app = express();

http.createServer(app).listen(3000);

app.get ('/', function(req, res) {
	res.send('<html><body>Hi</body></html>');
});

app.post('/scoreEssay', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	gloveService.generateWordVectors().then(function(response) {
		essayScorerService.scoreEssay(req.body.essay).then(function(response) {
			// console.log(response);
			res.send(JSON.stringify(response));
		}, function(errorResponse) {
			console.log(errorResponse);
			res.send(errorResponse);
		});		
	}, function(errorResponse) {
		res.send("Error generating word vectors");
	});

});
