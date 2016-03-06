app.factory('AuthFactory', ['$http', 'localStorageService', 'API_ENDPOINT', function ($http, localStorageService, API_ENDPOINT) {
	return {
		login: function($scope) {
	    	$http.post(API_ENDPOINT + 'users/sign_in.json', { user: $scope.user }).
	    	then(
				    function(response) {
				        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
			        	if (response.status == "Success") {
			        		console.log('Login success and token received');
			        		localStorageService.set('user_email', $scope.user.email);
			        		localStorageService.set('user_token', response.authentication_token);
			        		$scope.user = "";
			        	}
				    }, function(error) {
				    	console.log('Login failed and no token received');
				    }
			    )
        },
        logout: function(){
        	$http.delete(API_ENDPOINT + 'users/sign_out.json').
	    	then(
				    function(response) {
				        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
			        	if (response.status == "Success") {
			        		console.log('Logout success');
			        		localStorageService.remove('user_email');
			        		localStorageService.remove('user_token');
			        	}
				    }, function(error) {
				    	console.log('Logout failed');
				    }
			    )
        }
	};
}]);
