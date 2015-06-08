var w = document.body.clientWidth, // http://ryanve.com/lab/dimensions/
    h = document.body.clientHeight;

var svg = d3.select("body").append("svg:svg")
                           .attr("width", w).attr("height", h);

var circle = svg.selectAll("circle")
    .data(d3.range(150).map(function() {
      return {
        cx: w * Math.random(),
        cy: h * Math.random(),
        r: 50 + Math.random() * 70,
        color: d3.hsl("blue").brighter(Math.random() * 1)
      };
    }))
  .enter().append("svg:circle")
    .attr("r", function(d) {return d.r})
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .style("fill", function(d) {return d.color})
    .style("fill-opacity", 0.95)

  movementRate = 5

  function step() {
    // reset circle positions
    circle.transition()
        .attr("cx", function(d) { d.cx += Math.sign(Math.random() - .5) * movementRate; if (d.cx > w) d.cx = w; else if (d.cx < 0) d.x = 0; return d.cx; })
        .attr("cy", function(d) { d.cy += Math.sign(Math.random() - .5) * movementRate; if (d.cy > h) d.cy = h; else if (d.cy < 0) d.y = 0; return d.cy; })
        .duration(1000)
        .ease("linear")
  }

  step()
  window.setInterval(step, 500)