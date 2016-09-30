var express = require('express'),
qrrage = require('./routes/qrrage'),
bodyParser = require('body-parser'),
path = require('path'),
app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var connectionString = require(path.join(__dirname,'config'));

console.log(connectionString);


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/campus/:city', qrrage.findCampusByCity);


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});