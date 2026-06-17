angular.module('taskApp')
  .controller('LoginController', function($scope, $location, AuthService) {
    $scope.credentials = { email: '', password: '' };
    $scope.error = null;

    $scope.login = () => {
      AuthService.login($scope.credentials.email, $scope.credentials.password)
        .then(() => $location.path('/board'))
        .catch(() => $scope.error = 'Invalid email or password');
    };
  });