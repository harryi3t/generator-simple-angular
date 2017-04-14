(function() {

  const app = angular.module('simple', []);

  app.controller('index', ['$scope', indexController]);
  function indexController($scope) {
    $scope.message = 'Hello Angular!';
  }
}());
