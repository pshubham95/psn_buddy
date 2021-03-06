var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', 'config'));

exports.getCampusList = function (req, res, next) {

         var results = [];
         var city = req.params.city;
         console.log(city);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
        	console.log("Connection Error.....")
          done();
          console.log("Error:-",err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = null;
        if(city){
        	query = client.query("SELECT * FROM psn.campus WHERE upper(city)=$1 ORDER BY name ASC;", [city.toUpperCase()]);
        }else{
        	query = client.query("SELECT * FROM psn.campus ORDER BY id ASC;", []);        	
        }

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true, data: results});
        });

    });

};

exports.getFacilities = function (req, res, next) {
    var id = req.params.campusId;
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM psn.facilities WHERE campus_id=($1) ORDER BY name ASC;", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true, data: results});
        });

    });
};

exports.getAssets = function (req, res, next) {
	var id = req.params.facilityId;
	var results = [];
	
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err});
		}
		
		// SQL Query > Select Data
		var query = client.query("SELECT * FROM psn.assets WHERE facility_id=($1) ORDER BY name ASC;", [id]);
		
		// Stream results back one row at a time
		query.on('row', function(row) {
			results.push(row);
		});
		
		// After all data is returned, close connection and return results
		query.on('end', function() {
			done();
			return res.status(200).json({success: true, data: results});
		});
		
	});
};

exports.addAsset = function (req, res, next) {

    var results = [];
    var id = req.params.facilityId;
    // Grab data from http request
    var data = req.body;

    console.log(data);
    console.log(id)

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO psn.assets(facility_id, name, is_enabled, is_allocated_to_employee) values($1, $2, $3, $4)", [id, data.name, data.isEnabled, data.isAllocatedToEmp]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM psn.assets WHERE facility_id=($1) ORDER BY name ASC;", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({ success: true, data: results});
        });
    });
};

exports.deleteById = function (req, res, next) {
    var id = req.params.id;
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM employees WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM employees ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.updateAsset = function (req, res) {

    var results = [];

    // Grab data from the URL parameters
    var facilityId = req.params.facilityId;
    var assetId = req.params.assetId;
    console.log(facilityId +" "+assetId);
    // Grab data from http request
    var data = req.body;
    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        var query = client.query("UPDATE psn.assets SET name=($1), is_enabled=($2) , is_allocated_to_employee=($3)  WHERE id=($4) AND facility_id=($5)", [data.name, data.is_enabled, data.is_allocated_to_employee, assetId, facilityId]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM psn.assets WHERE id=($1) AND facility_id=($2)  ORDER BY id ASC", [assetId, facilityId]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true, data: results});
        });
    });

};
