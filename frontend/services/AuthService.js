angular.module('taskApp')
  .service('AuthService', function($http, API_URL) {
    let token = null;

    this.login = (email, password) => {
      return $http.post(`${API_URL}/login`, { email, password })
        .then(res => {
          token = res.data.token;
          return res.data;
        });
    };

    this.register = (name, email, password) => {
      return $http.post(`${API_URL}/register`, { name, email, password })
        .then(res => {
          token = res.data.token;
          return res.data;
        });
    };

    this.getToken = () => token;
    this.isLoggedIn = () => !!token;
    this.logout = () => { token = null; };
  });