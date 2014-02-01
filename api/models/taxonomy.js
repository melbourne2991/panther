var mongoose = require('mongoose'), 
	Schema 	 = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var taxonomySchema = new Schema({
	name: String
});

module.exports = mongoose.model('Taxonomy', taxonomySchema);