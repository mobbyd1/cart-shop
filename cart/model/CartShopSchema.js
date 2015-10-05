var mongodb = require('mongoose');

var CartShop = new mongodb.Schema({

	_id : {
		type: Number
	},

	items: [{
		name : String,
		price : Number,
		quantity : Number,
		thumb : String,
	}]

});

module.exports = mongodb.model( 'Cart', CartShop );