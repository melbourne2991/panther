describe("Products Controller", function() {
    it("should add a new product to the mongo database", function(next) {
        var ProductController = require('../../controllers/products');
        var Product = require('../../models/product.js');

        var req = { 
        	params: {
        		name: 'Coolest Product Ever',
        		description: 'A very nice product'
        	} 
        };

        ProductController.create(req, res);

		next();
    });
});