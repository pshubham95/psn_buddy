var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname,'config'));

exports.find = function(req, res, next){
    
    var data = req.body; 
    var sso = data.sso;
    var firstname = data.fname;
    var lastname = data.lname;
    console.log("Input parameters recieved are :: sso --" +sso +" --firstname -- " +firstname +" --lastname-- " +lastname);
    
    var isWhereAvailable = false;
      
    var queryString = "SELECT SSO, FIRST_NAME, LAST_NAME, FLOOR, WINGS, CUBICLE_NUMBER FROM GE_PSN_EMPLOYEE_FINDER ";
    var sso_condition = "SSO::text LIKE '"+sso+"%' ";
    var fname_condition = "LOWER(FIRST_NAME) LIKE '"+firstname+"%' ";
    var lname_condition = "LOWER(LAST_NAME) LIKE '"+lastname+"%' ";
    
    
    if(sso != null && sso != undefined && sso != "undefined"){
        if(!isWhereAvailable){
            queryString = queryString+" WHERE "+ sso_condition;
            isWhereAvailable = true;
        }else{
             queryString = queryString+" AND "+ sso_condition;
        }
    }
    
    if(firstname != null && firstname != undefined && firstname != "undefined"){
        if(!isWhereAvailable){
            queryString = queryString+" WHERE "+ fname_condition;
            isWhereAvailable = true;
        }else{
             queryString = queryString+" AND "+ fname_condition;
        }
    }
    
    if(lastname != null && lastname != undefined && lastname != "undefined"){
        if(!isWhereAvailable){
            queryString = queryString+" WHERE "+ lname_condition;
            isWhereAvailable = true;
        }else{
             queryString = queryString+" AND "+ lname_condition;
        }
    }
    
    console.log("Query formed :: "+queryString);
    
    
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        
    if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
    }

    var query = client.query(queryString);

    query.on('row', function(row) {
            results.push(row);
        });

    query.on('end', function() {
        done();
        return res.json(results);
    });

    });
}