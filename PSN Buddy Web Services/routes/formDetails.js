var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', 'config'));


exports.getFormDetails = function (req, res, next) {
	var asid = req.params.assetId;
	var results = [];
	var actions = [];

	//var actions = ["Call for repairs", "Request a new instance"];
	var contact = "Person 1";
	var asId = 1234;
	var contactNum = 8080804444;

	pg.connect(connectionString, function(err, client, done){
		if(err) {
        	console.log("Connection Error.....")
        	done();
        	console.log("Error:-",err);
        	return res.status(500).json({ success: false, data: err});
        }

        var query = null;
        query = client.query("SELECT contact_person, contact_number, contact_email FROM psn.assets WHERE id=($1);",[asid]);

		query.on('row', function(row) {
			results.push(row);
		});

        query = client.query("SELECT id, name FROM psn.asset_actions where asset_id=($1)", [asid]);

		query.on('row', function(row) {
			actions.push(row);
		});

		query.on('end', function() {
            done();

				return res.status(200).json({success: true, data: {assetId: asid, assetActions: actions, result: results}});

			});
        });
	
}
