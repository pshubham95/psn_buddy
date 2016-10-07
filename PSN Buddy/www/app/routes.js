define([ 'app',
// Load Controllers here
'controllers/dashboard', 'controllers/addAsset', 'controllers/floorMap',
		'controllers/employeeFinder' ],

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

		.state('addAsset', {
			url : '/addAsset/:campusId/:facilityId',
			templateUrl : 'app/templates/qrcode/add-asset.html',
			controller : 'AddAssetCtrl'
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
