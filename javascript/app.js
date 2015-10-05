angular.module("vtex-app", [])
.controller( "CartControllerVM", function( $scope, $http ) {

	$scope.users = [];
	$scope.items = [];

	$scope.search = function() {

		$.get ( "/org", {name: $scope.githubOrg}, function( data ) {

			$scope.users = [];
			data.forEach( function( user ){
				$scope.users.push( user );
			});

			$scope.$apply();
		});

	};

	$scope.add = function( index ) {

		var user = $scope.users[index];

		$.get("/add", user, function( cart ){
			
			$scope.users.splice( index, 1 );
			updateCart( cart );
			
		});
	}

	$scope.remove = function( index ) {

		var item = $scope.items[index];

		$.get("/remove", {name: item.name}, function( cart ) {
			updateCart( cart );
		});
	}

	var updateCart = function( cart ) {
		$scope.items = [];
		cart.items.forEach( function( item ) {
			$scope.items.push( item );
		});

		$scope.total = cart.total;

		$scope.$apply();
	}

});
