var controllers = require('../controllers')
var product = require('../controllers/products');

module.exports = function(app) {
	// app.get('/', controllers.index);

	app.get('/api/products', product.all);
	app.post('/api/products', product.create);
	app.get('/api/products/:productId', product.find);
	app.put('/api/products/:productId', product.update);
	// app.del('/api/product/:productId/', product.destroy);
}