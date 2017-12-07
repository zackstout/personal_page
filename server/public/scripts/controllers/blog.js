

app.controller('BlogController', function($location) {
  console.log('BlogController created');

  vm = this;
  vm.params = { p: 0.25 };

  var canvas2 = document.getElementById('parabola');
  var ctx2 = canvas2.getContext('2d');

  var canvas = document.getElementById('ball');
  var ctx = canvas.getContext('2d');

  var canvas6 = document.getElementById('parabolaBall');
  var ctx6 = canvas6.getContext('2d');

  var canvas7 = document.getElementById('polygon');
  var ctx7 = canvas7.getContext('2d');

  vm.x6 = 0;

  vm.n = 3;


//ball throw:
  function ball6() {
      // console.log((vm.x6 - 200)/100);
      ctx6.clearRect(0,0,400,400);
      var xStandard = (vm.x6 - 200)/100;
      var yPix = Math.pow(xStandard, 2)*100;

      ctx6.translate(200, 0);
      ctx6.beginPath();
      ctx6.arc(xStandard*100, yPix, 5, 0, 2*Math.PI);
      ctx6.stroke();
      ctx6.fillStyle = 'purple';
      ctx6.fill();
      ctx6.translate(-200, 0);

      vm.x6 += 5;
    }

    var ballThrown = false;
    vm.throwBall = function() {
      console.log('throwin');
      ballToThrow = setInterval(ball6, 50);
      if (ballThrown) {
        clearInterval(ballToThrow);
        vm.x6 = 0;
      }
      ballThrown = true;
    };


    //static parab:
  parabola2(200, 1, 1/(vm.params.p*4), 0, 0, 1);
  ctx2.transform(-1, 0, 0, 1, 0, 0);
  parabola2(200, 1, 1/(vm.params.p*4), 0, 0, -1);
  ctx2.transform(-1, 0, 0, 1, 0, 0);
  //grid:
  ctx2.moveTo(200, 0);
  ctx2.lineTo(200, 400);
  ctx2.stroke();
  ctx2.moveTo(0, 133);
  ctx2.lineTo(400, 133);
  ctx2.stroke();

  function parabola2(x, l, a, b, c, dir) {
    for (var j = 0; j < x; j++) {
      ctx2.moveTo(j*l + dir*200, -a*Math.pow(j*l/100, 2)*100 + b*j*l + c*100 + 200);
      ctx2.lineTo((j+1)*l + dir*200, -a*Math.pow((j+1)*l/100, 2)*100 + b*(j+1)*l +c*100 + 200);
      ctx2.stroke();
    }
  }

  //polygon:
  function circle2(a, b, x, r) {
    ctx7.beginPath();
    for (var i = 0; i < x; i++) {
      ctx7.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
      ctx7.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
      ctx7.stroke();
    }
  }

  vm.drawPolygon = function(n) {
    // console.log('hi', vm.n);
    // var n = vm.n;
    ctx7.clearRect(0,0,500,500);
    ctx7.translate(200, 200);
    circle2(1, 1, n, 100);
    ctx7.translate(-200,-200);
  };

  vm.drawPolygon(3);


  //parabola defn:

  function parabola(x, l, a, b, c, dir) {
  for (var i = 0; i < x; i++) {
    ctx.moveTo(i*l + dir*200, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
    ctx.lineTo((i+1)*l + dir*200, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
    ctx.stroke();
  }
}

vm.x = 270;

  vm.drawBall = function(x) {
    ctx.clearRect(0,0,1000,1000);
    //path of the ball:
    ctx.beginPath();
    // console.log(vm.x);

    // var x = 250 + iteration*2;

    // var xNow = (x-500)/100;
    var xNow = (x - 500)/100;
    // console.log(xNow);

    //draw moving ball:
    ctx.arc(x, 250 + xNow*xNow*100/(1), 6, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.fill();
    //re-draw parabola:
    ctx.translate(300, 0);
    parabola(200, 4, 1/(1), 0, 2.5, 1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(200, 4, 1/(1), 0, 2.5, -1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    ctx.translate(-300, 0);
    //redraw grid:
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 1000);
    ctx.stroke();
    ctx.moveTo(0, 250);
    ctx.lineTo(1000, 250);
    ctx.stroke();

    //redraw in focus:
    ctx.beginPath();
    ctx.arc(500, 250+25, 5, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
    //redraw in directrix (dotted line):
    for (var i=0; i<50; i++) {
      ctx.moveTo(i*20, 250-25);
      ctx.lineTo(i*20+10, 250-25);
      ctx.stroke();

    }

    //draw circle around point:
    ctx.beginPath();
    ctx.arc(x, 250 + xNow*xNow*100/(1), 25 + xNow*xNow*100/(1), 0, 2*Math.PI);
    ctx.stroke();

  }; //end of drawBall

  vm.drawBall(vm.x);


  //ellipse:



  //parabola reflection:



  //parabola orthogonal tangents:

});
