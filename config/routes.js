var controllers = require('../api/controllers')
var product = require('../api/controllers/product');

module.exports = function(app) {
	app.get('/', controllers.index);

	app.get('/api/products', product.all);
	app.post('/api/products', product.create);
	// app.get('/api/product/:productId/', product.show);
	// app.put('/api/product/:productId/', product.update);
	// app.del('/api/product/:productId/', product.destroy);
}