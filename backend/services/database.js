var pg = require('pg');

pg.defaults.ssl = true;

function createPerson () {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('INSERT INTO "PERSONS" VALUES(DEFAULT) Returning "Person_ID"', function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

			//console.log (result);	
			//console.log (result.rows[0].Person_ID);
			return result.rows[0].Person_ID;
		});
	});
}

function createGroup () {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('INSERT INTO "GROUPS" VALUES(DEFAULT) Returning "Group_ID"', function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

			return result.rows[0].Group_ID;
		});
	});
}

function joinGroup (person_ID, group_ID, name) {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('UPDATE "PERSONS" SET "Group_ID" = $1, "Name" = $2 WHERE "Person_ID" = $3',[group_ID, name, person_ID], function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

		});
	});
}

function getPersonsInGroup (group_ID) {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('SELECT "Person_ID" FROM "PERSONS" WHERE "Group_ID" = $1', [group_ID], function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

			var personList = [];

			result.rows.map((row) => {
				personList.push(row.Person_ID);
			});

			console.log (personList);
			return personList;
			
		});
	});
}

module.exports = (function() {
	return {
		createPerson: createPerson,
		createGroup: createGroup,
		joinGroup: joinGroup,
		getPersonsInGroup: getPersonsInGroup
	}
})();