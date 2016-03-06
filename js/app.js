var app = angular.module('myApp', ['LocalStorageModule']);

app.constant('API_ENDPOINT', "http://localhost:3000/")

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

	/*
	Login form
	Learn more: http://tutsnare.com/post-form-data-using-angularjs/
	*/

	// blank object to handle login form
	$scope.user = {};

	$scope.login = function(){
		var formData = $scope.user; // Object {email: "user@example.com", password: "12345678"}

    	$http.post('http://localhost:3000/users/sign_in.json', { user: formData }).
    	then(
			    function(response) {
			        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
		        	if (response.status == "Success") {
		        		console.log('Login success and token received');
		        		localStorageService.set('user_email', $scope.user.email);
		        		localStorageService.set('user_token', response.authentication_token);
		        	}
			    }, function(error) {
			    	console.log('Login failed and no token received');
			    }
		    )
    };

}]);
