var mongoose = require('mongoose'), 
	Schema 	 = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var productSchema = new Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Product', productSchema);