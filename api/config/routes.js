var passport = require('passport');
var Account = require('../models/account');
var controllers = require('../controllers')
var product = require('../controllers/products');


module.exports = function(app) {
	// app.get('/', controllers.index);

	app.get('/api/products', product.all);
	app.post('/api/products', product.create);
	app.get('/api/products/:productId', product.find);
	app.put('/api/products/:productId', product.update);
	// app.del('/api/product/:productId/', product.destroy);


	app.get('/login', function(req, res) {
  		res.render('login', { user : req.user });
	});

  	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.redirect('/');
  	});

  	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
  	});

  	app.get('/ping', function(req, res){
		res.send("pong!", 200);
  	});

}