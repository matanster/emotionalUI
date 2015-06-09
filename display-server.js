var displayServerEndPointPath = '/emotion'
var port         = 8000
var http         = require('http');
var express = require('express');
var app = express();

app.use(express.static('public'));
 
// handle incoming emotion
app.get('/emotion', function (req, res, next) {
    console.log('got emotion: ' + req.query.type + '=' + req.query.value)
    res.end('Ok');
    next();
});

var server = app.listen(port, function() {
  console.log('Server running on port ' + port);
});
