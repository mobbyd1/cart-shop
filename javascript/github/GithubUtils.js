var https = require('https');

var calculatePrice = function( numberOfFollowers, numberOfPublicRepos ) 
{
	var price = ( numberOfFollowers * 0.10 ) + ( numberOfPublicRepos * 0.05 ); 
	return price;
}

var getUserContent = function( userName, res ) 
{
	var urlOptions = 
	{
		host: 'api.github.com',
		path: '/users/' + userName,
		method: 'GET',
		headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
	}

	var content = undefined;

	var request = https.request(urlOptions, function(response)
	{
		var body = '';
			
		response.on('data',function(chunk){
		    body+=chunk;
		});

		response.on('end',function()
		{
			var json = JSON.parse( body ) ;
			if( json == null || json == undefined )
			{
				content = "";
			}

			console.log( json );

		    var userPrice = calculatePrice( json.followers, json.public_repos );
		    res.send( { name: userName, avatarUrl: json.avatar_url, price: userPrice } );
	
		});
	});
		
	request.on('error', function(e) {
		console.error( 'and the error is '+ e );
	});

	request.end();
}


module.exports = 
{
	getUserContent: function( userName, response )
	{
		getUserContent( userName, response );
	}
}

