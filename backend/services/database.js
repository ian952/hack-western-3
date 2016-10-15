var pg = require('pg');

pg.defaults.ssl = true;

function createPerson (name) {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('INSERT INTO "PERSONS" ("Name") VALUES($1) Returning "Person_ID"',[name], function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

			//console.log (result);	
			console.log (result.rows[0].Person_ID);
			return result.rows[0].Person_ID;
		});
	});
}

function createGroup (person_ID) {
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

			var new_group_ID = result.rows[0].Group_ID;

			client.query ('UPDATE "PERSONS" SET "Group_ID" = $1 WHERE "Person_ID" = $2',[new_group_ID, person_ID]);

			return new_group_ID;
		});
	});
}

function joinGroup (person_ID, group_ID) {
	pg.connect(process.env.DATABASE_URL , function(err, client) {
	  if (err) {
	  	console.log ('Database connection failed');
	  	return;
	  }
	  //console.log('Connected to postgres! Getting schemas...');

		client.query('UPDATE "PERSONS" SET "Group_ID" = $1 WHERE "Person_ID" = $2',[group_ID, person_ID], function (err, result) {
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

		client.query('SELECT "Person_ID", "Name" FROM "PERSONS" WHERE "Group_ID" = $1', [group_ID], function (err, result) {
			if (err) {
				console.log (err);
				return;
			}

			var personList = [];

			result.rows.map((row) => {
				personList.push({
					person_ID: row.Person_ID,
					name: row.Name
				});
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