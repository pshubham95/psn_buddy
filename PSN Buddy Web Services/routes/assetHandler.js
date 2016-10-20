var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', 'config'));

exports.getPhoneDetail = function(req,res,next)
{
    var phone = '+91 9767416034';
    return res.status(200).json({'phoneNumber': phone});
}


exports.AssetServiceRequest = function(req,res,next)
{
    var data = req.body;
    console.log(data.asset_id,data.asset_action_id,data.user_name,data.user_sso);
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          console.log("Connection Error.....")
          done();
          console.log("Error:-",err);
          return res.status(500).json({ success: false, data: err});
        }
        
        
        client.query("INSERT INTO psn.asset_requests(asset_id, asset_actions_id, requester_sso, requester_name)VALUES ($1, $2, $3, $4);",[data.asset_id,data.asset_action_id,data.user_sso,data.user_name],function(err,result)
                    {
            console.log('failed');
            //return res.status(500).json({'status':'Request Creation Failed','errorText':err});
        });
        done();
        return res.status(200).json({'status':'Request Created Successfully.'});
        
    });
}