var mongoose = require('mongoose'), 
	Schema 	 = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var taxonSchema = new Schema({
	name: String,
	taxonomy_id: ObjectId
});

module.exports = mongoose.model('Taxon', taxonSchema);