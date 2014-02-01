// Generates sample data for Panther.
// To regenerate, delete existing database first:
// mongo <dbname> --eval "db.dropDatabase()"


print('Inserting test data for products.');

db.products.insert([
	{
		name: "Panther T-Shirt",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosq.",
		price: 12.99,
		display_price: "$12.99",
		permalink: "panther-t-shirt"
	},
	{
		name: "Leopard T-Shirt",
		description: "Vix principes expetendis appellantur id. Nibh meliore an sit, mea erat dicit id, vix agam graeci assentior an. Per ex quot habeo, mea ne ullum facete repudiandae. Cu vix dolores imperdiet temporibus.",
		price: 10.99,
		display_price: "$12.99",
		permalink: "lion-t-shirt"
	},
	{
		name: "Lion T-Shirt",
		description: "Ex commodo admodum voluptua sit. At senserit sadipscing omittantur usu. Ei ius albucius percipit liberavisse, cum tacimates moderatius ea, cibo cetero eruditi ea nec. Inani corpora eum et, cum in summo simul cetero.",
		price: 16.99,
		display_price: "$16.99",
		permalink: "lion-t-shirt"
	},
]);	

print('Product Data Inserted.');
