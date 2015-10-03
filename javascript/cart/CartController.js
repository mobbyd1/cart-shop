module.exports = {

	addToCart: function( request, item )
	{
		var cart = request.session.cart || [];
		cart[item.name] = item;
	}

	removeFromCart: function( request, item ) 
	{
		var cart = request.session.cart || [];
		if( cart.length != 0 ) 
		{
			for( i = 0; i < cart.length; i++ )
			{
				if( cart[i].name == item.name )
				{
					cart.slice( i, 1 );
					break;
				}

			}
		}
	}
}