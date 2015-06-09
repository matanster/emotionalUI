var port        = 8000
var http        = require('http');
var connect     = require('connect');
var serveStatic = require('serve-static');

// serve static content with connect
connect().use(serveStatic(__dirname)).listen(port);
console.log('Server running on port ' + port);
