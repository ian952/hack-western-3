var Yelp = require('yelp');

var location;
var radius;
var allCategories = [];
var sortAns;
var finalRestaurants = [];
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

function randBool () {return Math.random() < 0.5};

function setup (loc, rad) {
	return new Promise ((resolve, reject) => {
		location = loc;
		radius = rad;
		resolve();
	});
}

function search (filter) {
	if (filter == '') 
		filter = 'restaurants';
	return yelp.search ({
		category_filter: filter,
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
				if (cur != 'Canadian (New)' && cur != 'American (Traditional)') {
					if (!categoryCount[cur]) {
						categoryCount[cur] = 1;
					} else {
						categoryCount[cur] ++;
					}
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

function getMajorityRes (ans,selected_group) {
	var ansMap = {
		ans1: 0,
		ans2: 0
	};
	var ans1;
	var ans2;
	selected_group.persons.map ((person) => {
		var answer = person.answers[ans];

		if (!ans1)
			ans1 = answer;
		else if (!ans2)
			ans2 = answer;

		if (ans1 == answer) {
			ansMap.ans1 ++;
		} else {
			ansMap.ans2 ++;
		}
	});

	if (ansMap.ans1 > ansMap.ans2) {
		return ans1;
	} else {
		return ans2;
	}

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

			if (prox > rating) {
				sortAns = 1;
			} else {
				sortAns = 2;
			}

			search ('').then((data) => {
				//console.log (data);
				if (num == 2) {
					popularCategory (data).then((popularCategories) => {
						var res = {
							done: false,
							question: 'Pick one:',
							answers: popularCategories
						};
						//console.log (res);
						resolve (res);
					});
				} else if (num == 4) {
					var categories = [];
					data.businesses.map((bus) => {
						bus.categories.map ((category) => {
							var cur = category[0];
							if (cur != 'Canadian (New)' && cur != 'American (Traditional)') {
								if (categories.indexOf (category[0]) == -1) {
									categories.push (category[0]);
								}

								if (!allCategories[category[0]]) {
									allCategories[category[0]] = {
										filter_name: category[1],
										count: 0
									};
								}
							}
						});
					});
					var res = {
						done: false,
						question: 'Pick your own category:',
						answers: categories
					};
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

			while (picked.length < 5) {
				//console.log (picked);
				if (randBool()) {
					recommanded.reverse();
				} 

				recommanded.map((item) => {
					allCategories[item[0]] = {
						filter_name: item[1],
						count: 0
					};

					if (picked.length < 5 && randBool()) {
						picked.push(item[0]);
					}
				});
			}

			var res = {
				done: false,
				question: 'Pick One:',
				answers: picked
			};


			resolve (res);

		} else if (num == 5) {
			//console.log (allCategories);
			selected_group.persons.map ((person) => {
				person.answers.map ((answer,i) => {
					if (i == 1 || i == 2 || i == 3) {
						allCategories[answer].count ++;
					}
				});
			});

			for (var key in allCategories) {
				if (allCategories[key].count == 0) {
					delete allCategories[key];
				}
			}

			console.log ('Categories:');
			console.log (allCategories);

			var sortable = [];
			for (var cat in allCategories) {
				if (cat != 'remove') {
			      sortable.push([cat, allCategories[cat]]);
				}
			  }
			sortable.sort(
			    function(a, b) {
			        return b[1].count - a[1].count;
			    }
			);

			var filter = '';
			//console.log (sortable);

			//possibly want to randomize the order if they are all the same

			for (var i = 0; i < sortable.length ; i++) {
				if (i != 0) 
					filter += ',';
				filter += sortable[i][1].filter_name;
			}

			//console.log (filter);

			console.log ('start search');
			console.log (filter);
			search(filter).then((data) => {
				console.log ('search done');
				//finalRestaurants = data.businesses;

				data.businesses.map((business) => {
					var temp_categories = [];

					business.categories.map ((category) => {
						temp_categories.push (category[0]);
					});

					finalRestaurants.push({
						rating_img_url: business.rating_img_url,
						name: business.name,
						categories:temp_categories,
						img_url: business.image_url,
						yelp_url: business.url
					});

				});

				//console.log (data);
				console.log ('final restaurants');
				console.log (finalRestaurants);

				resolve ({
					done: false,
					question: 'Pick One:',
					answers: [finalRestaurants[0], finalRestaurants[1]]
				});
			}).catch(function(err){console.log(err)});

		} else if (num == 6 || num == 7 || num == 8) {
			var index = (num-5) * 2;
			resolve ({
				done: false,
				question: 'Pick One:',
				answers: [finalRestaurants[index], finalRestaurants[index+1]]
			});
		} else if (num == 9 || num == 10) {
			var index = (num - 9) * 2 + 5 - 1;

			resolve ({
				done: false,
				question: 'Pick One:',
				answers: [getMajorityRes (index,selected_group), getMajorityRes (index+1,selected_group)]
			});
			
		} else if (num == 11) {
			resolve ({
				done: false,
				question: 'Pick One:',
				answers: [getMajorityRes (8,selected_group), getMajorityRes (9,selected_group)]
			});

		} else if (num == 12) {
			resolve ({
				done: true,
				question: 'Done',
				answers: [getMajorityRes (10,selected_group)]
			});
		}
	});
}

module.exports = (function() {
	return {
		search: search,
		popularCategory: popularCategory,
		genQuestion: genQuestion,
		setup: setup
	}
})();