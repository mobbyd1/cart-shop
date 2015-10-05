var Mongodb = require('mongoose');
var Cart = require('../model/CartShopSchema');

Mongodb.connect('mongodb://vtex-app:vtex-app@ds041633.mongolab.com:41633/cart-db');

var CartController = function(){

}

CartController.prototype.addToCart = function( item, callback ) {

	var callbackFind = function( err, cart ) {
		if( err ) {
			throw err;
		}

		if( cart == undefined ) {

			var newCart = new Cart( {
				_id: 1,
				total: item.price,
				items: [item]
			});

			newCart.save( function( err, model ) {
				if( err ){
					throw err;
				} 

				callback( model );
			});

		} else {

			Cart.findByIdAndUpdate( 
			1
			, {$push: { "items": item } }
			, {safe: true, upsert: true, new: true}
			, function( err, model ) {
				if( err ) {
					throw err;
				} 

				callback( model );

			});
		}

	}

	Cart.findById( 1, callbackFind );
}

CartController.prototype.getCart = function( callback ) {

	Cart.findById( 1, function( err, cart ) {

		if( err ) {
			throw err;
		}

		callback( cart );

	});
}

CartController.prototype.deleteCart = function( callback ) {

	Cart.remove( { _id: 1 }, function( err ) {

		if( err ) {
			throw err;
		}

		callback();
	}).exec();
}

CartController.prototype.removeItem = function( itemName ,callback ) {

	Cart.update(
		{ _id: 1 },
		{ $pull: { 'items': { name: itemName } } },
		function( err ) {
			if( err ) {
				throw err;
			}
			callback();
		}
	);
}

module.exports = 
{
	addToCart: function( item, callback ) {
		var cart = new CartController();
		cart.addToCart( item, callback );
	},

	deleteCart: function( callback ) {
		var cart = new CartController();
		cart.deleteCart( callback );
	},

	getCart: function( callback ) {
		var cart = new CartController();
		cart.getCart( callback );
	},

	removeItem: function( itemName ,callback ) {
		var cart = new CartController();
		cart.removeItem( itemName, callback );
	}
}
