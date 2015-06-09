//var port = (process.env.VCAP_APP_PORT || 8888); 
var displayServerEndPointPath = '/emotion'
var port                      = 8000
var webSocketPort             = 8080
var http                      = require('http');

// required modules
var WebSocket = require('ws')
var express = require('express');

//
// define server routing
//

app = express();

app.use(express.static('public'));
 
// handle incoming emotion
app.get('/emotion', function (req, res, next) {
    console.log('got emotion: ' + req.query.type + '=' + req.query.value)
    res.end('Ok');
    next();
});

// start the general server
var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
  startWebSocketServer()
});

function startWebSocketServer() {
  // start the websocket server
  var WebSocketServer = require('ws').Server;

  console.log('starting websocket server on port ' + webSocketPort);
   
  wss = new WebSocketServer({port: webSocketPort});
  wss.on('connection', function(ws) {
      console.log('a Websocket client now connected')
      ws.on('message', function(message) { console.log('received websocket message: %s', message); });
      ws.send('connected');
  });

  // alternatively see for sharing on the http server's port in: (look for "precreated")
  // https://github.com/websockets/ws/blob/6fa71524811535be7b9b2750d5c160e4e9364b2d/test/WebSocketServer.test.js
}