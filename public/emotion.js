var hostWebSocketPort = 8080
var hostName          = 'localhost'

numberOfBalls  = 90
movementRate   = 20
radiusBase     = 50
radiusVariance = 1.3
radiusMax      = 100
radiusMin      = 30
stepDuration   = 2000
baseColor      = d3.hsl("blue")

var displayText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
var displayTextColor = "#AADD99"

function dirInit() { return Math.sign(Math.random() - .5) }

var w = document.body.clientWidth, // http://ryanve.com/lab/dimensions/
    h = document.body.clientHeight;

var textFramexPad = w * .3
var textFrameyPad = h * .3

var svg = d3.select("body").append("svg:svg")
                           .attr("width", w).attr("height", h)
                           .style("background-color", baseColor.brighter(-0.2))

console.log(textFramexPad.toString() + "px")

var textFrame = d3.select("body").append("div")
                                 // location and dimensions
                                 .style("position", "fixed")
                                 .style("left", textFramexPad)
                                 .style("top", textFrameyPad)
                                 .style("width", w - (textFramexPad * 2))
                                 .style("height", h - (textFrameyPad * 2))

                                 // box roundness
                                 .style("border-radius", "1em")

                                 // font 
                                 .style("font-family", "Helvetica")
                                 .style("font-size", "26px")
                                 .style("font-style", "italic")

                                 // colors
                                 .style("color", displayTextColor)
                                 .style("background-color", baseColor.brighter(-0.4))

                                 // internal margin
                                 .style("padding", "2em")

                                 // internal allignment (using a nested div hack)
                                 .style("display", "table")
                                 .append("div")
                                    .style("display", "table-cell")
                                    .style("vertical-align", "middle")
                                 //.style("text-align", "center")

textFrame.text(displayText)

// initialize the circles display
var circle = svg.selectAll("circle")
    .data(d3.range(numberOfBalls).map(function() {
      return {
        r:     radiusBase + (Math.random() * (radiusBase * radiusVariance)),
        color: baseColor.brighter(Math.random() * 0.8),
        cx:    w * Math.random(),
        cy:    h * Math.random(),
        xdir:  dirInit(),
        ydir:  dirInit()
      };
    }))
  .enter().append("svg:circle") 
    .attr("r", function(d) {return d.r})
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .style("fill", function(d) {return d.color})
    .style("fill-opacity", 0.95)

function evolveX(d) {
  
        //console.log(d.xdir)
        d.cx += d.xdir * movementRate; 
        if (d.cx > w) 
          { d.cx = w; d.xdir = dirInit() }
        else if (d.cx < 0) 
          { d.cx = 0; d.xdir = dirInit()}
        d.xdir += (Math.random() - .5) * 2.5
        return d.cx; 
}

function evolveY(d) {
  
        //console.log(d.xdir)
        d.cy += d.ydir * movementRate; 
        if (d.cy > h) 
          { d.cy = h; d.ydir = dirInit() }
        else if (d.cy < 0) 
          { d.cy = 0; d.ydir = dirInit() }
        d.ydir += (Math.random() - .5) * 2.5
        return d.cy; 
}

function evolveR(d) {
  d.r *= 1 + ((Math.random() - .5) * 0.3)
  if (d.r > radiusMax) d.r = radiusMax
  if (d.r < radiusMin) d.r = radiusMin
  return d.r
}

function step() {
  // reset circle positions
  circle.transition()
      .attr("cx", evolveX)
      .attr("cy", evolveY)
      .attr("r", evolveR)
      //.attr("cy", function(d) { d.cy += Math.sign(Math.random() - .5) * movementRate; if (d.cy > h) d.cy = h; else if (d.cy < 0) d.y = 0; return d.cy; })
      .duration(stepDuration)
      .ease("linear")
}

step()
window.setInterval(step, stepDuration)

//
// websocket communication with the server, for continuous visualization changing
//

var ws = new WebSocket('ws://' + hostName + ':' + hostWebSocketPort);
ws.onopen = function(event) {
  console.log('websocket connection to ' + hostName + ' (on port ' + hostWebSocketPort + ') now open')
};
ws.onclose = function(event) {
  console.log('websocket connection to ' + hostName + ' (on port ' + hostWebSocketPort + ') closed now - did you expect this?')
};

ws.onmessage = function(event) {
    console.log('received: %s', event.data);
};