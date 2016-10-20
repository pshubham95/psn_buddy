var express = require('express'),
qrrage = require('./routes/qrrage'),
assetHandler = require('./routes/assetHandler'),
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
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

app.get('/campusList/:city?', qrrage.getCampusList);
app.get('/facilities/:campusId', qrrage.getFacilities);
app.get('/assets/:facilityId', qrrage.getAssets);
app.post('/assets/:facilityId', qrrage.addAsset);
app.post('/assets/:facilityId/:assetId', qrrage.updateAsset);

app.get('/assetHandler/getPhone',assetHandler.getPhoneDetail);
app.post('/assetHandler/makeRequest',assetHandler.AssetServiceRequest);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
