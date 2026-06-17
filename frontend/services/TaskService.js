angular.module('taskApp')
  .service('TaskService', function($http, API_URL, AuthService) {
    const authHeader = () => ({
      headers: { Authorization: `Bearer ${AuthService.getToken()}` }
    });

    this.getTasks = () => $http.get(`${API_URL}/tasks`, authHeader());
    this.createTask = (task) => $http.post(`${API_URL}/tasks`, task, authHeader());
    this.updateTask = (id, task) => $http.put(`${API_URL}/tasks/${id}`, task, authHeader());
    this.deleteTask = (id) => $http.delete(`${API_URL}/tasks/${id}`, authHeader());
  });