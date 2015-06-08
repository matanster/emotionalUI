movementRate = 20
numberOfBalls = 20
radiusBase = 50
radiusVariance = 1.3
stepDuration = 2000
function dirInit() { return Math.sign(Math.random() - .5) }

var w = document.body.clientWidth, // http://ryanve.com/lab/dimensions/
    h = document.body.clientHeight;

var svg = d3.select("body").append("svg:svg")
                           .attr("width", w).attr("height", h);

// initialize the circles display
var circle = svg.selectAll("circle")
    .data(d3.range(numberOfBalls).map(function() {
      return {
        r:     radiusBase + (Math.random() * (radiusBase * radiusVariance)),
        color: d3.hsl("blue").brighter(Math.random() * 0.8),
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
            { d.x = 0; d.xdir = dirInit()}
          d.xdir += (Math.random() - .5) * 2.5
          return d.cx; 
  }

  function evolveY(d) {
    
          //console.log(d.xdir)
          d.cy += d.ydir * movementRate; 
          if (d.cy > h) 
            { d.cy = h; d.ydir = dirInit() }
          else if (d.cy < 0) 
            { d.y = 0; d.ydir = dirInit() }
          d.ydir += (Math.random() - .5) * 2.5
          return d.cy; 
  }

  function evolveR(d) {
    d.r *= 1 + ((Math.random() - .5) * 0.3)
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