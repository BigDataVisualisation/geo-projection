var data = [];
var ready = false;

var projection = null;

function setup() {
  createCanvas(800, 800);

  projection = d3.geoMercator() //Projektionsart, Auflistung von Projektionen:https://github.com/d3/d3-geo#projections
    .center([2.173404, 41.385063]) //Kartenmittelpunkt
    .translate([width / 2, height / 2]) //Screen Position des Kartenmittelpunktes
    .scale(200000);

  d3.csv("coordinates.csv", function (d) {
    return {
      lat: +d.latitude,
      lon: +d.longitude
    };
  }).then(function (csv) {
    data = csv;

    console.log(data);
    ready = true;

  });

}

function draw() {

  if (!ready) {
    background(255, 0, 0);
    return;
  } else {
    background(255);
  }

  noStroke();
  fill(0, 100);
  for (var i = 0; i < data.length; i++) {
    var lon = data[i].lon;
    var lat = data[i].lat;
    var pos = projection([lon, lat]);
    ellipse(pos[0], pos[1], 2, 2);
  }


}