define(['app', 'services/service'], function (app) {
  'use strict';

  app.controller('DashboardCtrl', ['$scope', 'myService', '$ionicSideMenuDelegate',function ($scope, myService, $ionicSideMenuDelegate) {
      $scope.name = myService.getName();
      
  }]);
});
