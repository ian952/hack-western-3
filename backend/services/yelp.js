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

// function popularCategory (data){
// 	return new Promise ((resolve,reject) => {

// 		.then ((data) => {
			
// 		})
// 		.catch ((err) => {
// 			console.log (err);
// 		});
// 	});
// }

module.exports = (function() {
	return {
		search: search
	}
})();