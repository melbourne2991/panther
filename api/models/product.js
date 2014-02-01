var mongoose = require('mongoose'), 
	Schema 	 = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	display_price: String
	date_available: {type: Date. default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);