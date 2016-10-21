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
						                                        'contact_person character(30),'+
                                            						'contact_number numeric,'+
						                                        'contact_email character(20),'+
					  						'is_enabled boolean,'+
					  						'is_allocated_to_employee boolean NOT NULL,'+
					  						'CONSTRAINT assets_pkey PRIMARY KEY (id),'+
					  						'CONSTRAINT assets_facility_id_fkey FOREIGN KEY (facility_id) '+
					  						'REFERENCES psn.facilities (id) MATCH SIMPLE '+
					  						'ON UPDATE NO ACTION ON DELETE NO ACTION) '+		
				  							'WITH (OIDS=FALSE);'),
        this.none('CREATE TABLE psn.assets_actions(id serial NOT NULL,'+
													  'asset_id integer,'+
													  'name character(40),'+
													  'CONSTRAINT facility_actions_pkey PRIMARY KEY (id),'+
													  'CONSTRAINT asset_actions_asset_id_fkey FOREIGN KEY (asset_id) '+
												      'REFERENCES psn.assets (id) MATCH SIMPLE '+
												      'ON UPDATE NO ACTION ON DELETE NO ACTION) '+
												      'WITH (OIDS=FALSE);'),
        this.none('CREATE TABLE psn.asset_requests ('+
                    'asset_id integer,'+
                    'asset_actions_id integer,'+
                    'requester_sso integer NOT NULL,'+
                    'requester_name character(30),'+
                    'id serial NOT NULL,'+
                    'description character(150),'+
                    'other_asset_action character(30));'),
    
      this.none('ALTER TABLE ONLY psn.asset_requests ADD CONSTRAINT id PRIMARY KEY (id);'),  
      this.none('ALTER TABLE ONLY psn.asset_requests ADD CONSTRAINT asset_actions_id FOREIGN KEY (asset_actions_id) REFERENCES assets_actions(id);'),
    
      this.none('ALTER TABLE ONLY psn.asset_requests ADD CONSTRAINT asset_id FOREIGN KEY (asset_id) REFERENCES assets(id);'),

      this.none('INSERT INTO psn.campus(name, country, state, city) VALUES ($1, $2, $3, $4);',["psn", "India", "Karnataka","Bengaluru"]),
    
      this.none('INSERT INTO psn.facilities (id, campus_id, name, is_enabled) VALUES ($1, $2, $3, $4);',[1, 1, 'Conference Room', true]),
    
      this.none('INSERT INTO psn.facilities (id, campus_id, name, is_enabled) VALUES ($1, $2, $3, $4);',[2, 1, 'Work Station', true]),
      
      this.none('INSERT INTO psn.assets (id, facility_id, name, is_enabled, is_allocated_to_employee, contact_person, contact_number, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[1, 1, 'Projector           ', true, true, 'Person 1            ', 9767416034, 'person1@ge.com']),
        
      this.none('INSERT INTO psn.assets (id, facility_id, name, is_enabled, is_allocated_to_employee, contact_person, contact_number, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[2, 1, 'Web cam             ', true, true, 'Person 2            ', 9767416034, 'person2@ge.com      ']),
        
        this.none('INSERT INTO psn.assets (id, facility_id, name, is_enabled, is_allocated_to_employee, contact_person, contact_number, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[3, 1, 'TV Screen           ', true, true, 'Person 3            ', 9767416034, 'person3@ge.com      ']),
        
        this.none('INSERT INTO psn.assets (id, facility_id, name, is_enabled, is_allocated_to_employee, contact_person, contact_number, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[4, 2, 'Desk Phone          ', true, true, 'Person 4            ', 9767416034, 'person4@ge.com      ']),
        
        this.none('INSERT INTO psn.assets (id, facility_id, name, is_enabled, is_allocated_to_employee, contact_person, contact_number, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[5, 2, 'Docking Station     ', true, true, 'Person 5            ', 9767416034, 'person5@ge.com      ']),
          
        
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[1, 'Device not working', 1]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[2, 'Device overheating', 1]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[3, 'Device not working  ', 2]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[4, 'Blurry Video', 2]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[5, 'Device not working', 3]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[6, 'Screen Flickering', 3]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[7, 'Device not working', 4]),

      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[8, 'Keyboard not working', 5]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[9, 'Mouse not working', 5]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[10, 'Monitor screen not working', 5]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[11, 'Other', 1]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[12, 'Other', 2]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[13, 'Other', 3]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[14, 'Other', 4]),
      this.none('INSERT INTO psn.assets_actions (id, name, asset_id) VALUES ($1,$2,$3);',[15, 'Other', 5])
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
