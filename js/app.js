var app = angular.module('myApp', ['LocalStorageModule']);

app.constant('API_ENDPOINT', "http://localhost:3000/");

app.config(function($httpProvider) {
    $httpProvider.interceptors.push(function(localStorageService) {
      return {
        'request': function(config) {
          config.headers['X-USER-EMAIL'] = localStorageService.get('user_email');
          config.headers['X-USER-TOKEN'] = localStorageService.get('user_token');
          return config;
        }
      };
    });
});

app.controller('myCtrl', ['$scope', '$http', 'localStorageService', 'API_ENDPOINT', function ($scope, $http, localStorageService, API_ENDPOINT) {
	$scope.name = API_ENDPOINT;
	
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

	/*
	Login form
	Learn more: http://tutsnare.com/post-form-data-using-angularjs/
	*/

	// blank object to handle login form
	$scope.user = {};

	$scope.login = function(){
		var formData = $scope.user; // Object {email: "user@example.com", password: "12345678"}

    	$http.post(API_ENDPOINT + 'users/sign_in.json', { user: formData }).
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
    };

    /*
    Log out
    */
    $scope.logout = function(){
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
    };

    /*
    Get posts
    */
    $scope.getPosts = function(){
    	$http.get(API_ENDPOINT + 'posts.json').
    	then(
			    function(response) {
			    	console.log('Posts loaded successfully');
			        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
		        	console.log(response);
			    }, function(error) {
			    	console.log('Failed to load posts');
			    }
		    )
    };

}]);
