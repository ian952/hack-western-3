var Yelp = require('yelp');

var location;
var radius;
var allCategories = [];
/*
	name:{
		filter_name:,
		count:
	}
*/

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

function randBool () {Math.random() < 0.5};

function setup (loc, rad) {
	return new Promise ((resolve, reject) => {
		location = loc;
		radius = rad;
		resolve();
	});
}

function search (sortAns){
	return yelp.search ({
		category_filter: 'restaurants',
		location: location,
		radius_filter: radius,
		sort: sortAns
	});
}

function popularCategory (data){
	var categoryCount = {};

	return new Promise ((resolve,reject) => {
		data.businesses.map((bus) => {
			bus.categories.map ((category) => {
				var cur = category[0];
				if (!categoryCount[cur]) {
					categoryCount[cur] = 1;
				} else {
					categoryCount[cur] ++;
				}
				//console.log (cur);
			});
		});

		//console.log (categoryCount);

		var sortable = [];
		for (var cat in categoryCount)
		      sortable.push([cat, categoryCount[cat]]);
		sortable.sort(
		    function(a, b) {
		        return b[1] - a[1];
		    }
		);

		var res = [];

		for (var i = 0; i < 5 && i < sortable.length; i++) {
			res.push (sortable[i][0]);
		}

		//console.log (res);
		resolve (res);
	});
}

function genQuestion (num, selected_group) {
	return new Promise ((resolve, reject) => {
		if (num == 1) {
			resolve ({
				done: false,
				question: 'Pick one:',
				answers: ['Rating', 'Proximity']
			});
		} else if (num == 2 || num == 4) {
			var rating = 0;
			var prox = 0;

			selected_group.persons.map ((person) => {
				if (person.answers[0] == 'Proximity') {
					prox ++;
				} else if (person.answers[0] == 'Rating') {
					rating ++;
				}
			});

			var sortAns;
			if (prox > rating) {
				sortAns = 1;
			} else {
				sortAns = 2;
			}

			search (location, radius).then((data) => {
				if (num == 2) {
					popularCategory (data).then((popularCategories) => {
						var res = {
							done: false,
							question: 'Pick one:',
							answers: popularCategories
						};
						console.log ('Q2: ' + res);
						resolve (res);
					});
				} else if (num == 4) {
					var categories = [];
					data.businesses.map((bus) => {
						bus.categories.map ((category) => {
							if (categories.indexOf (category[0]) == -1) {
								categories.push (category[0]);
							}

							if (!allCategories[category[0]]) {
								allCategories[category[0]] = {
									filter_name: category[1],
									count: 0
								};
							}
						});
					});
					var res = {
						done: false,
						question: 'Pick your own category:',
						answers: categories
					};
					console.log ('Q4: ' + res);
					resolve (res);
				}
			});
		} else if (num == 3) {
			var recommanded = [
				['Pub Food', 'pubfood'],
				['Food Court', 'food_court'],
				['Greek', 'greek'],
				['Chinese', 'chinese'],
				['Japanese', 'japanese'],
				['Korean', 'korean'],
				['Mexican', 'mexican'],
				['Italian', 'italian'],
				['Seafood', 'seafood'],
				['Buffets', 'buffets'],
				['Indian', 'indpak']
			];

			var picked = [];

			

			if (randBool()) {
				recommanded.reverse();
			} 

			recommanded.map((item) => {
				allCategories[item[0]] = {
					filter_name: item[1],
					count: 0
				};

				if (picked.length < 5 && randBool()) {
					picked.append(item[0]);
				}
			});

			var res = {
				done: false,
				question: 'Pick One',
				answers: picked
			};

			console.log ('Q3: ' + res);

			resolve (res);

		} else if (num == 5) {
			selected_group.persons.map ((person) => {
				person.answers.map ((answer,i) => {
					if (i == 1 || i == 2 || i == 3) {
						allCategories[answer].count ++;
					}
				});
			});

			allCategories.filter ((category) => {
				category.count > 0;
			});

			var sortable = [];
			for (var cat in allCategories)
			      sortable.push([cat, allCategories[cat]]);
			sortable.sort(
			    function(a, b) {
			        return b.count - a.count;
			    }
			);

			var res = [];

			//possibly want to randomize the order if they are all the same

			for (var i = 0; i < 8 ; i++) {
				res.push (sortable[i][1].filter_name);
			}

			resolve ();

		}
	});
}

module.exports = (function() {
	return {
		search: search,
		popularCategory: popularCategory,
		genQuestion: genQuestion
	}
})();