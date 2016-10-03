var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE employees(id SERIAL PRIMARY KEY, firstName VARCHAR(40) not null,lastName VARCHAR(40) not null,title VARCHAR(40) not null)');
query.on('end', function() { client.end(); });