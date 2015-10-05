var https = require('https');

var githubPass = "";

var GithubUtils = function() {
}

var calculatePrice = function( numberOfFollowers, numberOfPublicRepos ) 
{
	var price = ( numberOfFollowers * 0.10 ) + ( numberOfPublicRepos * 0.05 ); 
	return price;
}

var getUserContent = function( userName, callback ) 
{
	var urlOptions = 
	{
		host: 'api.github.com',
		path: '/users/' + userName + githubPass,
		method: 'GET',
		headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
	}

	requestJsonContent( urlOptions, function( json ) {

		var userPrice = calculatePrice( json.followers, json.public_repos );
		var user = 
		{
			name: json.name,
			price: userPrice,
			thumb: json.avatar_url,
			quantity: 1
		};

		console.log( user );

		callback( user );
	});
		
}

GithubUtils.prototype.getOrganizationMembers = function( organizationName, callback ) {

	var urlOptions = 
	{
		host: 'api.github.com',
		path: '/orgs/' + organizationName + '/members' + githubPass,
		method: 'GET',
		headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
	};

	var members = [];
	requestJsonContent( urlOptions, function( json ) {

		if( json == undefined ) {
			callback( [] );
		} else {

			var i = 0;
			json.forEach( function ( member ){
				getUserContent( member.login, function( userContent ){
						members.push( userContent );
						if( i == ( json.length - 1 ) ) {
							callback( members );
						}
						i++;
				});

			});
		}
			
	});

}

var requestJsonContent = function( urlOptions, callback ) {

	var request = https.request( urlOptions, function( response ){
		var body = '';
			
		response.on('data',function(chunk){
		    body+=chunk;
		});

		response.on('end',function()
		{
			var json = JSON.parse( body ) ;
			if( json.message != undefined )
			{
				json = undefined;
			}

		    callback( json );
	
		});
	
	});

	request.on('error', function(e) {
		console.error( 'and the error is '+ e );
	});

	request.end();
}

module.exports = new GithubUtils();

