var Product = require('../models/product.js');

exports.create = function(req, res) {
	new Product({ name: req.query.name, description: req.query.description }).save();
	res.send('Submitted');
};

exports.all = function(req, res) {
	Product.find(function(err, products) {
		if (err) {
			res.send('There was an error: ' + err)
		}
		else {
			res.send(products)		
		}
	});
}