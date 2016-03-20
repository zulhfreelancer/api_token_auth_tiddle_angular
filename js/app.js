var app = angular.module('myApp', ['LocalStorageModule', 'ngFileUpload']);

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

// controllers load here
// factories load here
