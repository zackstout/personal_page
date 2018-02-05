
var can;
var h = 800;
var w = 800;
var s = 360;
var start = {x: 350, y: 250};
var started = false;

$(document).ready(() => {
  $('#start').on('click', () => {
    console.log('start clicked');
    started = true;
  });
  $('#clear').on('click', () => {
    console.log('end');
    started = false;
  });
});

function setup() {
  can = createCanvas(h, w);
  arc(start.x, start.y, 0.5, 0.5, 0, 2*Math.PI);
  fill(100);

}

function draw() {
  // clear();
  // console.log(can);
  drawVertices(s);
  if (started) {
    frameRate(100);
    drawNextPoint();
  }

}


var vertices = [{x: h/2, y: w/10}, {x: h/2 + s, y: w/10 + s*Math.pow(3, 0.5)}, {x: h/2 - s, y: w/10 + s*Math.pow(3, 0.5)}];

function drawVertices(s) {
  // noFill();
  vertices.forEach((v) => {
    arc(v.x, v.y, 25, 25, 0, 2*Math.PI);
  });
  // console.log(random(5));
}

function drawNextPoint() {
  var random = Math.floor(Math.random() * vertices.length);
  var maxX = Math.max(vertices[random].x, start.x);
  var minX = Math.min(vertices[random].x, start.x);
  var maxY = Math.max(vertices[random].y, start.y);
  var minY = Math.min(vertices[random].y, start.y);

  var newPoint = {x: minX + (maxX - minX)/2, y: minY + (maxY - minY)/2};
  fill(100);
  arc(newPoint.x, newPoint.y, 0.5, 0.5, 0, 2*Math.PI);

  start.x = newPoint.x;
  start.y = newPoint.y;
}

function drawRandomPoint2() {
  var random = Math.floor(Math.random() * vertices.length);
  var maxX = Math.max(vertices[random].x, start.x);
  var minX = Math.min(vertices[random].x, start.x);
  var maxY = Math.max(vertices[random].y, start.y);
  var minY = Math.min(vertices[random].y, start.y);

  var newPoint = {x: minX + (maxX - minX)/2, y: minY + (maxY - minY)/2};
  ctx0.beginPath();
  ctx0.arc(newPoint.x, newPoint.y, 0.15, 0, 2*Math.PI);
  // ctx0.stroke();
  if (maxX === start.x && maxY === start.y) {
    ctx0.fillStyle = 'green';
  }
  if (maxX === start.x && minY === start.y) {
    ctx0.fillStyle = 'purple';
  }
  if (minX === start.x && maxY === start.y) {
    ctx0.fillStyle = 'blue';
  }
  if (minX === start.x && minY === start.y) {
    ctx0.fillStyle = 'red';
  }

  ctx0.fill();

  start.x = newPoint.x;
  start.y = newPoint.y;
}

var fractalInt;
// vm.startSierp = function() {
//   fractalInt = setInterval(drawRandomPoint2, 0.01);
// };
// vm.stopSierp = function() {
//   clearInterval(fractalInt);
// };
