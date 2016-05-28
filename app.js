var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
var envs = require('envs');
require('dotenv').load();
app.set('environment', envs('NODE_ENV', 'production')); 
GLOBAL.AUTHUSER = false;
app.use(function(err, req, res, next) {
    
    
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



process.on('unhandledRejection', function(reason, p){
    var x =p;
    var y = process;
    console.log(reason);
});

var api = require('./routes/api.js');
app.use('/api', api);

app.get('/', function(req, res) {
    console.log("AAAAAAAAAAHHHH FCUKK");
  res.send('Lets share, Sharing is caring');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});