define([
  'app'
], function (app) {
  'use strict';

  app.service('PsnBuddyService', ['$resource','$http','$q','$filter',
    function ($resource, $http, $q, $filter) {
	  var deferred = $q.defer();
    	this.campusList = null;
    	this.facilities = null;
    	this.getCampusList = function (options) {
    		if(this.campusList!=null){
    			var data = $filter('filter')(this.campusList,function(obj){
    				obj.city == options.city;
    			});
    			deferred.resolve(data);
    		}else{
    			var me = this;
    			if(options){
    				$resource("http://localhost:5000/campusList/:city").query(options).$promise.then(function(data) {
    					me.campusList = data;
    					deferred.resolve(data);
    				}); 			
    			}else{
    				$resource("http://localhost:5000/campusList/:city").query().$promise.then(function(data) {
    					me.campusList = data;
    					deferred.resolve(data);
    				});
    			}
    			return deferred.promise;
    		}
    	};
    	    	
    	this.getCurrentCity = function(position) {
    		var URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
    		var deferred = $q.defer();
    		$http({method: 'GET', 'url': URL}).success(function(data, status) {
    			var cityName = $filter('filter')(data.results[0].address_components, function(obj){
    				return obj.types.indexOf('locality')>=0;
    			})
    			deferred.resolve({'cityName': cityName[0].long_name });
    			console.log(cityName);
            }).error(function(data, status) {
              deferred.reject(data || "Request failed");
          });
    		return deferred.promise;
    	};
    	    	
    	this.getFacilities = function(options){
    		var deferred = $q.defer();
    		if(this.facilities != null){
    			var data = $filter('filter')(this.facilities,function(obj){
    				obj.campus_id == options.campusId;
    			});
    			if(data.length<=0){
        			var me = this;
    				$resource("http://localhost:5000/facilities/:campusId").query(options).$promise.then(function(data) {
    					me.facilities.push(data);
    					deferred.resolve(data);
    				}); 			
        			//return deferred.promise;
    			}else{
    				deferred.resolve(data);    				
    			}
    		}else{
    			var deferred = $q.defer();
    			var me = this;
				$resource("http://localhost:5000/facilities/:campusId").query(options).$promise.then(function(data) {
					me.facilities = angular.fromJson(data);
					deferred.resolve(angular.fromJson(data));
				}); 			
    		}
    		return deferred.promise;
    	};
    }
  ]);
});
