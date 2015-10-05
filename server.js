var express = require('express');
var https = require('https');
var cons = require('consolidate');
var GithubUtils = require('./github/GithubUtils');
var CartController = require('./cart/controller/CartController');

app = express();
app.listen( process.env.PORT || '8080' );

console.log('Servidor rodando...');

app.set('view engine', 'jade');
app.use('/bootstrap', express.static(__dirname + '/static/bootstrap'));
app.use('/jquery', express.static(__dirname + '/static/jquery'));
app.use('/angular', express.static(__dirname + '/static/angular'));
app.use('/js', express.static(__dirname + '/javascript'));

var sendCartResponse = function( cart, response ) {

	var total = 0.0;
	cart.items.forEach( function ( item ) {
		total += item.price * item.quantity;
	});

	var cartDTO = {
		total: total,
		items: cart.items
	}

	response.json( cartDTO );
}

app.get('/', function (req, res)
{
	CartController.deleteCart( function() {
		res.sendfile('views/index.html', {root: __dirname });
	} );
});

app.get( '/add', function(req, res)
{	
	var item = {
		name: req.query.name,
		price: req.query.price, 
		quantity: req.query.quantity,
		thumb: req.query.thumb
	}

	console.log( "Adding: " + JSON.stringify( item ) + " to the cart..." );

	CartController.addToCart( item, function( cart ) {
		sendCartResponse( cart, res );
	});
});

app.get( '/remove', function(req, res)
{
	console.log( "Removing " + req.query.name + " from cart..." );

	CartController.removeItem( req.query.name, function() {

		CartController.getCart( function( cart ) {
			sendCartResponse( cart, res );
		});

	});
});

app.get( '/org', function(req, res){
	
	console.log("Getting " + req.query.name + " members from Github...");

	GithubUtils.getOrganizationMembers( req.query.name, function( members ){
		res.send( members );
	});

});


