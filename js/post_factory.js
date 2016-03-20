app.factory('PostFactory', ['$http', 'API_ENDPOINT', 'Upload', function ($http, API_ENDPOINT, Upload) {

	var obj = {};

	obj.getPosts = function($scope){
		$http.get(API_ENDPOINT + 'posts.json').
    	then(
			    function(response) {
			    	console.log('Posts loaded successfully');
			        var response = response.data; // Object {status: "Success", message: "..."}
		        	console.log(response);
		        	$scope.posts = response;
			    }, function(error) {
			    	console.log('Failed to load posts');
			    }
		    )
	}

	obj.createPost = function($scope){
		console.group("form data (include photo)");
		console.log($scope.post);
		console.groupEnd();

		Upload.upload({
            url: API_ENDPOINT + 'posts.json',
            data: {post: $scope.post}
        }).
        then(function (response) {
            console.log('Post created successfully');
	        var response = response.data;
        	console.log(response);
        	$scope.post = "";
        	// add it to the posts list
        	obj.getPosts($scope);
        }, function (response) {
            console.log('Failed to create post');
        });

	}

	obj.deletePost = function($scope, post_id){
		$http.delete(API_ENDPOINT + 'posts/' + post_id + '.json').
    	then(
			    function(response) {
			    	console.log('Post deleted successfully');
			        var response = response.data; // Object {status: "Success", message: "..."}
		        	console.log(response);
		        	// reload the posts
		        	obj.getPosts($scope);
			    }, function(error) {
			    	console.log('Failed to delete post');
			    }
		    )
	}

	return obj;

}]);
