
  var cardioidPosition = 1;

  function setup() {
    var can = createCanvas(800, 800);
  }

  function draw() {
    clear();
    translate(400, 400);
    circleCard(1, 1, 200, 300, cardioidPosition);
    cardioidPosition += 0.01;
    translate(-400, -400);
    $('.num').html(cardioidPosition.toFixed(2));
  }


  //x is how far you iterate, r is radius, f controls number of flower petals or nodes:
  function circleCard(a, b, x, r, f) {
    for (var i = 0; i < x; i++) {
      var start = {xCoord: r*a*Math.cos(i*2*Math.PI/x), yCoord: r*b*Math.sin(i*2*Math.PI/x)};
      var doubleStart = (f * i) % x;
      var end = {xCoord: r*a*Math.cos(doubleStart*2*Math.PI/x), yCoord: r*b*Math.sin(doubleStart*2*Math.PI/x)};

      line(start.xCoord, start.yCoord, end.xCoord, end.yCoord);
      stroke(color('darkblue'));
    }
  }
