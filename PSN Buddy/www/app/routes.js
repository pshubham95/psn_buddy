define([ 'app',
// Load Controllers here
     	'controllers/dashboard', 
     	'controllers/asset', 
     	'controllers/floorMap',
		'controllers/employeeFinder',
		'controllers/qrscan'],

function(app) {
	'use strict';
	// definition of routes
	app.config([ '$stateProvider', '$urlRouterProvider',

	function($stateProvider, $urlRouterProvider) {
		// url routes/states
		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
		// app states

		.state('dashboard', {
			url : '/dashboard',
			templateUrl : 'app/templates/qrcode/dashboard.html',
			controller : 'DashboardCtrl'
		})
		
		.state('qrscan', {
			url : '/qrscan',
			templateUrl : 'app/templates/qrcode/qrscan.html',
			controller : 'QRCtrl'
		})

		.state('asset', {
			url : '/asset/:campusId/:facilityId',
			templateUrl : 'app/templates/qrcode/asset.html',
			controller : 'AssetCtrl'
		})

		.state('floormap', {
			url : '/floormap',
			templateUrl : 'app/templates/floorMap.html',
			controller : 'floorMapCtrl',
			cache : false
		})

		.state('findmylocation', {
			url : '/findmylocation',
			templateUrl : 'app/templates/employeeFinder.html',
			controller : 'empFinderCtrl',
			cache : false
		})

	} ]);
});
