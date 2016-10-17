define([
  'app'
], function (app) {
  'use strict';

  app.service('PsnBuddyService', ['$resource','$http','$q','$filter','_',
    function ($resource, $http, $q, $filter,_) {
	  var deferred = $q.defer();
    	this.campusList = null;
    	this.facilities = null;
    	this.assets = null
    	this.getCampusList = function (options) {
    		if(this.campusList!=null){
    			var data = $filter('filter')(this.campusList,function(obj){
    				obj.city == options.city;
    			});
    			deferred.resolve(data);
    		}else{
    			var me = this;
    			var promiseObj = options ? $resource("http://localhost:5000/campusList/:city",null,{'query':  {method:'GET', isArray:false}}).query(options) : $resource("http://localhost:5000/campusList/:city",null,{'query':  {method:'GET', isArray:false}}).query({isArray: false})
				promiseObj.$promise.then(function(response) {
					me.campusList = response.data;
					deferred.resolve(response.data);
				},function(err, response){
					deferred.reject(response);
				});
    		}
    		return deferred.promise;
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
    		var facilities = _.findWhere(this.campusList,{id: options.campusId}).facilities;
    		if(facilities){
				deferred.resolve(facilities);    				
    		}else{
    			var me = this;
				$resource("http://localhost:5000/facilities/:campusId",null,{'query':  {method:'GET', isArray:false}})
				.query(options)
				.$promise
				.then(function(response) {
					_.findWhere(me.campusList,{id: options.campusId}).facilities = response.data;
					deferred.resolve(response.data);
				}); 			
    		}
    		return deferred.promise;
    	};
    	this.getAssets = function(options){
    		var deferred = $q.defer();
    		var assets = _.findWhere(_.findWhere(this.campusList,{id: options.campusId}).facilities,{id: options.facilityId}).assets;
    		if(assets){
    			deferred.resolve(assets);
    		}else{
    			var me = this;
				$resource("http://localhost:5000/assets/:facilityId", null, {'query':  {method:'GET', isArray:false}})
					.query({facilityId: options.facilityId})
					.$promise.then(function(response) {
						_.findWhere(_.findWhere(me.campusList,{id: options.campusId}).facilities,{id: options.facilityId}).assets = response.data;
						deferred.resolve(response.data);
					}); 	
    		}
    		return deferred.promise;
    	};
    	
    	this.addAsset = function(options){
    		var deferred = $q.defer();
    		var me = this;
    		$resource("http://localhost:5000/assets/:facilityId", {facilityId: options.facilityId})
    				.save({}, options)
    				.$promise.then(function(data){
    					deferred.resolve(data);
    					_.findWhere(_.findWhere(me.campusList,{id: options.campusId}).facilities,{id: options.facilityId}).assets = data.data;
    					console.log(data)
    				},function(err, response){
    					deferred.reject(response);
    					console.log(err,response);
    				})
			return deferred.promise;
    	};
    	
    	this.updateAsset = function(options){
    		var deferred = $q.defer();
    		var me = this;
    		$resource("http://localhost:5000/assets/:facilityId/:assetId", {facilityId: options.facility_id, assetId: options.id})
    			.save({}, options)
    			.$promise.then(function(data){
    				var obj = _.findWhere(
						_.findWhere(
								_.findWhere(me.campusList,{id: options.campusId}).facilities, {id: options.facility_id}
						).assets, {id: options.id}
    				); 
    				obj.name = data.data[0].name;
    				obj.is_enabled = data.data[0].is_enabled;
    				obj.is_allocated_to_employee = data.data[0].is_allocated_to_employee;
    				deferred.resolve(data);
    			},function(err, response){
    				deferred.reject(response);
    			})
    		return deferred.promise;
    	};
    }
  ]);
});
