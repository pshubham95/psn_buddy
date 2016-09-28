define([
  'app',
  // Load Controllers here
  'controllers/dashboard',
  'controllers/floorMap'    
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
      
      
      
    }
  ]);
});
