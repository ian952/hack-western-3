var pg = require('pg');

pg.defaults.ssl = true;

function createPerson (name) {
	return new Promise((resolve, reject) => {
	  	pg.connect(process.env.DATABASE_URL , (err, client) =>{
		  	if (err) {
		  		console.log ('Database connection failed');
		  		return;
		  	}
		  	//console.log('Connected to postgres! Getting schemas...');

			client.query('INSERT INTO "PERSONS" ("Name") VALUES($1) Returning "Person_ID"',[name], function (err, result) {
				if (err) {
					reject(err);
				}

				//console.log (result);	
				console.log (result.rows[0].Person_ID);
				resolve(result.rows[0].Person_ID);
			});
		});
	});
}


function createGroup (person_ID) {
	return new Promise((resolve, reject) => {
		pg.connect(process.env.DATABASE_URL , (err, client) => {
		  if (err) {
		  	console.log ('Database connection failed');
		  	reject(err);
		  }
		  //console.log('Connected to postgres! Getting schemas...');

			client.query('INSERT INTO "GROUPS" VALUES(DEFAULT) Returning "Group_ID"', function (err, result) {
				if (err) {
					console.log (err);
					return;
				}

				var new_group_ID = result.rows[0].Group_ID;

				client.query ('UPDATE "PERSONS" SET "Group_ID" = $1 WHERE "Person_ID" = $2',[new_group_ID, person_ID]);

				resolve(new_group_ID);
			});
		});
	});
}

function joinGroup (person_ID, group_ID) {
	return new Promise((resolve, reject) => {
		pg.connect(process.env.DATABASE_URL , (err, client) => {
		  if (err) {
		  	console.log ('Database connection failed');
		  	reject(err);
		  }
		  //console.log('Connected to postgres! Getting schemas...');

			client.query('UPDATE "PERSONS" SET "Group_ID" = $1 WHERE "Person_ID" = $2',[group_ID, person_ID], function (err, result) {
				if (err) {
					console.log(err);
					reject(err);
				}
			});
		});
	});
}

function getPersonsInGroup (group_ID) {
	return new Promise((resolve, reject) => {
		pg.connect(process.env.DATABASE_URL , (err, client) => {
		  if (err) {
		  	console.log ('Database connection failed');
		  	return;
		  }
		  //console.log('Connected to postgres! Getting schemas...');

			client.query('SELECT "Person_ID", "Name" FROM "PERSONS" WHERE "Group_ID" = $1', [group_ID], function (err, result) {
				if (err) {
					console.log (err);
					reject(err);
				}

				var personList = [];

				result.rows.map((row) => {
					personList.push({
						person_ID: row.Person_ID,
						name: row.Name
					});
				});

				console.log (personList);
				resolve(personList);
			});
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