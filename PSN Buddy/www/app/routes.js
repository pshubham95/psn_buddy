define([
  'app',
  // Load Controllers here
  'controllers/dashboard',
  'controllers/floorMap',
  'controllers/employeeFinder' 
], 
       

function (app) {
  'use strict';
  // definition of routes
  app.config(['$stateProvider','$urlRouterProvider',
    

    function ($stateProvider, $urlRouterProvider) {
      // url routes/states
      $urlRouterProvider.otherwise('dashboard');

      $stateProvider
        // app states
        
    .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/templates/dashboard.html',
          controller: 'DashboardCtrl'
        })
      
      
    .state('floormap', {
            url: '/floormap',
            templateUrl: 'app/templates/floorMap.html',
            controller: 'floorMapCtrl',
            cache: false
      })
      
      
       .state('findmylocation', {
            url: '/findmylocation',
            templateUrl: 'app/templates/employeeFinder.html',
            controller: 'empFinderCtrl',
            cache: false
      })
      
      
    }
  ]);
});
