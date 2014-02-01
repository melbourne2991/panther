var Product = require('../models/product.js');

exports.create = function(req, res) {
	new Product({
		name: req.params.name, 
		description: req.params.description 
	}).save();

	res.send('Submitted');
};

exports.all = function(req, res) {
	Product.find(function(err, products) {
		if (err) {
			res.send('There was an error: ' + err);
		}
		else {
			res.send(products);	
		}
	});
};

exports.find = function(req, res) {
	Product.findOne({_id: req.params.productId }, function(err, product) {
		if (err) {
			res.send('There was an error: ' + err);
		}
		else {
			res.send(product);	
		}
	});
}

