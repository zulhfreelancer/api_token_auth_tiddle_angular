app.factory('PostFactory', ['$http', 'API_ENDPOINT', function ($http, API_ENDPOINT) {
	return {
		getPosts: function(){
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
		}
	};
}]);
