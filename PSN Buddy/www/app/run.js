define([
  'app'
], function (app) {
  'use strict';
  
  // the run blocks
  app.run([
    '$ionicPlatform',
    function ($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && Keyboard) {
        	Keyboard.hideFormAccessoryBar(true);
        	Keyboard.disableScrollingInShrinkView(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    }
  ]);
});
