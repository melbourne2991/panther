var Product = require('../models/product.js');

exports.create = function(req, res) {
	new Product(req.body).save(function(err) {
		if (err) {
			res.send({response: 'An error was encountered.', err: err});	
		}
		else {
			res.send({response: 'Created new Product Object', err: null})
		}
	});
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

exports.update = function(req, res) {
	console.log(req.body);

	res.send('yo dawg');

	// Product.findOne({_id: req.params.productId }, function(err, product) {

	// }
}