// The main app definition
// --> where you should load other module depdendencies
define([
  'ionic', 'qrScanner', 'angular-resource'
], function () {
  'use strict';

  // the app with its used plugins
  var app = angular.module('app', [
    'ionic', 'qrScanner', 'ngResource'
  ]);
  // return the app so you can require it in other components
  return app;
});
