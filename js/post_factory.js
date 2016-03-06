app.factory('PostFactory', ['$http', 'API_ENDPOINT', function ($http, API_ENDPOINT) {

	var obj = {};

	obj.getPosts = function($scope){
		$http.get(API_ENDPOINT + 'posts.json').
    	then(
			    function(response) {
			    	console.log('Posts loaded successfully');
			        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
		        	console.log(response);
		        	$scope.posts = response;
			    }, function(error) {
			    	console.log('Failed to load posts');
			    }
		    )
	}

	obj.createPost = function($scope){
		$http.post(API_ENDPOINT + 'posts.json', { post: $scope.post }).
    	then(
			    function(response) {
			    	console.log('Post created successfully');
			        var response = response.data; // Object {status: "Success", message: "User signed-in successfully and token created", authentication_token: "9vCkNM-Qk8QkuxEDyXh6"}
		        	console.log(response);
		        	$scope.post = "";
		        	// add it to the posts list
		        	obj.getPosts($scope);
			    }, function(error) {
			    	console.log('Failed to create post');
			    }
		    )
	}

	return obj;

}]);
