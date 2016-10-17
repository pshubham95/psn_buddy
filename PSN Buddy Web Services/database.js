//var pg = require('pg');
var pgp = require('pg-promise')();
var path = require('path');
var connectionString = require(path.join(__dirname, 'config'));

var db = pgp(connectionString);
//var client = new pg.Client(connectionString);
//client.connect();
db.tx(function () {
    return this.batch([
        this.none('CREATE TABLE psn.campus(id serial NOT NULL,'+ 
        									'name character(20) NOT NULL,'+
        				  					'country character(20) NOT NULL,'+
        				  					'state character(20) NOT NULL,'+
											'city character(20) NOT NULL,'+
        				  					'CONSTRAINT campus_pkey PRIMARY KEY (id),'+
        				  					'CONSTRAINT campus_name_key UNIQUE (name)) '+
        				  					'WITH (OIDS=FALSE);'),
        this.none('CREATE TABLE psn.facilities(id serial NOT NULL,'+
        				  						'campus_id integer,'+
    				  							'name character(20),'+
    				  							'is_enabled boolean,'+
    				  							'CONSTRAINT facilities_pkey PRIMARY KEY (id),'+
    				  							'CONSTRAINT facilities_campus_id_fkey FOREIGN KEY (campus_id) '+
    				  							'REFERENCES psn.campus (id) MATCH SIMPLE '+
    				  							'ON UPDATE NO ACTION ON DELETE NO ACTION,'+
    				  							'CONSTRAINT facilities_name_key UNIQUE (name)) '+
    				  							'WITH (OIDS=FALSE);'),
		this.none('CREATE TABLE psn.assets(id serial NOT NULL,'+
						  					'facility_id integer,'+
					  						'name character(20),'+
					  						'is_enabled boolean,'+
					  						'is_allocated_to_employee boolean NOT NULL,'+
					  						'CONSTRAINT assets_pkey PRIMARY KEY (id),'+
					  						'CONSTRAINT assets_facility_id_fkey FOREIGN KEY (facility_id) '+
					  						'REFERENCES psn.facilities (id) MATCH SIMPLE '+
					  						'ON UPDATE NO ACTION ON DELETE NO ACTION) '+		
				  							'WITH (OIDS=FALSE);'),
        this.none('CREATE TABLE psn.facility_actions(id serial NOT NULL,'+
													  'facility_id integer,'+
													  'name character(20),'+
													  'CONSTRAINT facility_actions_pkey PRIMARY KEY (id),'+
													  'CONSTRAINT facility_actions_facility_id_fkey FOREIGN KEY (facility_id) '+
												      'REFERENCES psn.facilities (id) MATCH SIMPLE '+
												      'ON UPDATE NO ACTION ON DELETE NO ACTION) '+
												      'WITH (OIDS=FALSE);'),
        this.none('INSERT INTO psn.campus(name, country, state, city) VALUES ($1, $2, $3, $4);',["PSN", "India", "Karnataka","Bengaluru"])
        
    ]);
})
.then(function (response) {
	console.log('Success=',response)
    // success;
})
.catch(function (error) {
    console.log(error); // print error;
});
//var query = client.query('CREATE TABLE employees(id SERIAL PRIMARY KEY, firstName VARCHAR(40) not null,lastName VARCHAR(40) not null,title VARCHAR(40) not null)');
//query.on('end', function() { client.end(); });