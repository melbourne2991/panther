var Taxonomy = require('../models/taxonomy.js');

exports.find = function(req, res) {
	Taxonomy.findOne({_id: req.params.taxonomyId }, function(err, product) {
		if (err) {
			res.send('There was an error: ' + err);
		}
		else {
			res.send(taxonomy);	
		}
	});
}

exports.taxons = function(req, res) {
	Taxonomy.findOne({_id: req.params.taxonomyId }, function(err, taxonomy) {
		var taxons = Taxon.find({taxonomy_id: taxonomy._id}, function(err, taxons) {
			res.send(taxons);
		});
	});
}