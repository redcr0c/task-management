angular.module('taskApp', ['ngRoute'])
  .constant('API_URL', 'http://127.0.0.1:8000/api')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', { templateUrl: 'views/login.html', controller: 'LoginController' })
      .when('/board', { templateUrl: 'views/board.html', controller: 'BoardController' })
      .otherwise({ redirectTo: '/login' });
  });