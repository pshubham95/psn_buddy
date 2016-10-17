define([
  'app'
], function (app) {
  'use strict';

  app.service('DashboardService', ['$http', '$q','$filter','_',
    function ($http, $q, $filter,_) {
	   this.getDashboardOptions = function(isEmployee) {
		   var deferred = $q.defer();
		   $http({
			   method: 'GET',
			   'url': 'json/dashboard-options.json'
		   }).success(function(data, status) {
			   console.log(data);
			   var data = _.filter(data,function(obj){
				   if(isEmployee){
					   return true;
				   }else{
					   return !obj.isSSOprotected;
				   }
			   })
			   deferred.resolve(data);
           }).error(function(data, status) {
        	   console.log(data, status)
        	   deferred.reject(data || "Request failed");
           }); 
		   return deferred.promise;
	   };
  	}
  ])
})