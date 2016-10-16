var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

function search (location, radius){
	return yelp.search ({
		category_filter: 'restaurants',
		location: location,
		radius_filter: radius,
		sort: 2
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

module.exports = (function() {
	return {
		search: search,
		popularCategory: popularCategory
	}
})();