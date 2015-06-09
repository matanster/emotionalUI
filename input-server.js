var displayServerEndPointPath = '/emotion'
var displayServerEndPointHost = 'localhost'
var displayServerEndPointPort = 8000
var displayServerEndPoint = displayServerEndPointHost + ':' + 
                            displayServerEndPointPort + 
                            displayServerEndPointPath

var http = require('http');

console.log('starting to ping display server at ' + displayServerEndPoint + ' at random intervals')

function loop() { 
  setTimeout(sendEmotion, 
                    Math.random()*15000, // timeout delay
                    'excitement',        // emotion type  
                    Math.random() * 2 - 1)       // emotion value
}

function sendEmotion(type, value) {

  var requestUrl = "http://" + displayServerEndPoint + '?' + 'type=' + encodeURIComponent(type) + '&' 
                    + 'value=' + encodeURIComponent(value);

  var request = {
    hostname  : displayServerEndPointHost,
    port      : displayServerEndPointPort,
    path      : displayServerEndPointPath + 
               '?' + 'type=' + encodeURIComponent(type) + '&' + 
               'value=' + encodeURIComponent(value),
    keepAlive : true
  }

  console.log('sending emotion as ' + requestUrl)
  http.get(request, function(res){ 
    res.on('data', function() { }); // must process this otherwise takes up one connection indefinitely
    //console.log("Got response: " + res.statusCode); 
  })

  .on('error', function(e) {
    console.log('failed sending to display server, error: ' + e.message); });

  loop();
}

loop();