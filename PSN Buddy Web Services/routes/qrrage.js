var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', 'config'));

exports.findCampusByCity = function (req, res, next) {

         var results = [];
         var city = req.params.city;
         console.log(city)
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
        var query = client.query("SELECT * FROM psn.campus WHERE upper(city)=$1 ORDER BY id ASC;", [city.toUpperCase()]);

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

exports.findById = function (req, res, next) {
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

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM employees WHERE id=($1) ORDER BY id ASC;", [id]);

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

exports.createEmployee = function (req, res, next) {

    var results = [];

    // Grab data from http request
    var data = req.body;

    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO employees(firstName, lastName, title) values($1, $2, $3)", [data.firstName, data.lastName, data.title]);

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

exports.updateById = function (req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.id;

    // Grab data from http request
    var data = req.body;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE employees SET firstName=($1), lastName=($2) , title=($3) WHERE id=($4)", [data.firstName, data.lastName, data.title, id]);

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
