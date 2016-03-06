app.controller('myCtrl', ['$scope', 'localStorageService', 'AuthFactory', 'PostFactory', function ($scope, localStorageService, AuthFactory, PostFactory) {
	/*
	For localStorage, we're using this library:
	https://github.com/grevory/angular-local-storage
	*/
	// SET LS: 			localStorageService.set('test', 100)
	// GET LS: 			console.log(localStorageService.get('test'));
	// LIST OF KEYS: 	console.log( localStorageService.keys() );
	// DELETE LS: 		localStorageService.remove('test');

	// when page loads, check if user has email and token in localStorage or not
	$scope.user_credentials = function(){
		var email = localStorageService.get('user_email');
		var token = localStorageService.get('user_token');

		if (email && token) {
			return true;
		} else {
			return false;
		}
	}

	/* =============
	Login form // Learn more: http://tutsnare.com/post-form-data-using-angularjs/
	============= */

	// blank object to handle login form
	$scope.user  = {};
	$scope.login = function(){
		AuthFactory.login($scope);
    };

    /* =============
    Log out
    ============= */
    $scope.logout = function(){
    	AuthFactory.logout();
    };

    /* =============
    Get posts
    ============= */
    $scope.getPosts = function(){
    	PostFactory.getPosts();
    };

}]);
