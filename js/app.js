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

}]);
