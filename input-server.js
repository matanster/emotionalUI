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

  var request = "http://" + displayServerEndPoint + '?' + 'type=' + encodeURIComponent(type) + '&' 
                + 'value=' + encodeURIComponent(value);
  console.log(request)
  http.get(request, function(res){})
  .on('error', function(e) {
    console.log('failed sending to display server, error: ' + e.message); });

  loop();
}

loop();