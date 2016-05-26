var express = require('express');
var app = express();

//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

var api = require('./routes/api.js');
app.use('/api', api);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});