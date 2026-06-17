angular.module('taskApp')
  .controller('BoardController', function($scope, TaskService) {
    $scope.tasks = [];
    $scope.newTask = { title: '', priority: 'medium' };

    function loadTasks() {
      TaskService.getTasks().then(res => $scope.tasks = res.data);
    }

    $scope.addTask = () => {
      TaskService.createTask($scope.newTask).then(() => {
        $scope.newTask = { title: '', priority: 'medium' };
        loadTasks();
      });
    };

    loadTasks();
  });