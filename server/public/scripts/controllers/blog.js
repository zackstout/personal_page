

app.controller('BlogController', function($location, $anchorScroll) {
  console.log('BlogController created');

  vm = this;
  vm.params = { p: 0.25 };

  vm.m = 4;

  vm.goToPost = function(n) {
    $location.hash('post'+n);
    $anchorScroll();
  };

  var canvas2 = document.getElementById('parabola');
  var ctx2 = canvas2.getContext('2d');

  var canvas = document.getElementById('ball');
  var ctx = canvas.getContext('2d');

  var canvas6 = document.getElementById('parabolaBall');
  var ctx6 = canvas6.getContext('2d');

  var canvas7 = document.getElementById('polygon');
  var ctx7 = canvas7.getContext('2d');

  var canvas3 = document.getElementById('ellipse');
  var ctx3 = canvas3.getContext('2d');

  var canvas4 = document.getElementById('parabReflection');
  var ctx4 = canvas4.getContext('2d');

  var canvas5 = document.getElementById('parabOrth');
  var ctx5 = canvas5.getContext('2d');

  // var canvas8 = document.getElementById('triangle');
  // var ctx8 = canvas8.getContext('2d');



  console.log(canvas5);


  function drawTriangle(s, x, y) {
    ctx8.translate(x, y);
//draw three lines:
    ctx8.moveTo(0,0);
    ctx8.lineTo(s, s*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.moveTo(0,0);
    ctx8.lineTo(-s, s*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.moveTo(s, s*Math.pow(3, 0.5));
    ctx8.lineTo(-s, s*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.translate(-x,-y);
  }

  function drawInnerTriangle(s, x, y) {
    ctx8.translate(x, y);
    ctx8.moveTo(s, s*Math.pow(3, 0.5));
    ctx8.lineTo(-s, s*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.moveTo(-s, s*Math.pow(3, 0.5));
    ctx8.lineTo(0, s*2*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.moveTo(s, s*Math.pow(3, 0.5));
    ctx8.lineTo(0, s*2*Math.pow(3, 0.5));
    ctx8.stroke();
    ctx8.translate(-x,-y);
  }

  // drawTriangle(140, 150, 50);
  // drawInnerTriangle(70, 150, 50);
  //
  // drawInnerTriangle(35, 150, 50);
  // drawInnerTriangle(35, 150+70, 150+70*Math.pow(3, 0.5));


  vm.x6 = 0;

  vm.n = 3;

  vm.hardText = 'for (var i=0; i<balls.length; i++){\n var ball = balls[i]; \n ellipse(ball.position.x, ball.position.y, ball.circleRadius);\n}';




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


      vm.parabola2 = function(x, l, a, b, c, dir) {
        // console.log('hi', a);
        ctx2.clearRect(0,0, 2000,2000);
        ctx2.beginPath();
        for (var j = 0; j < x; j++) {
          ctx2.moveTo(j*l + dir*200, -a*Math.pow(j*l/100, 2)*100 + b*j*l + c*100 + 200);
          ctx2.lineTo((j+1)*l + dir*200, -a*Math.pow((j+1)*l/100, 2)*100 + b*(j+1)*l +c*100 + 200);
          ctx2.stroke();
        }
        ctx2.transform(-1, 0, 0, 1, 0, 0);

        for (var k = 0; k < x; k++) {
          ctx2.moveTo(k*l - dir*200, -a*Math.pow(k*l/100, 2)*100 + b*k*l + c*100 + 200);
          ctx2.lineTo((k+1)*l - dir*200, -a*Math.pow((k+1)*l/100, 2)*100 + b*(k+1)*l +c*100 + 200);
          ctx2.stroke();
        }
        ctx2.transform(-1, 0, 0, 1, 0, 0);
        ctx2.moveTo(200, 0);
        ctx2.lineTo(200, 400);
        ctx2.stroke();
        ctx2.moveTo(0, 133);
        ctx2.lineTo(400, 133);
        ctx2.stroke();
      };

  vm.parabola2(200, 1, 1/(vm.params.p*4), 0, 0, 1);
  ctx2.transform(-1, 0, 0, 1, 0, 0);
  vm.parabola2(200, 1, 1/(vm.params.p*4), 0, 0, -1);
  ctx2.transform(-1, 0, 0, 1, 0, 0);
  //grid:
  ctx2.moveTo(200, 0);
  ctx2.lineTo(200, 400);
  ctx2.stroke();
  ctx2.moveTo(0, 133);
  ctx2.lineTo(400, 133);
  ctx2.stroke();





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











  vm.a = 80;
   vm.b = 110;
    vm.theta = 0;
    vm.showTangent = false;

    vm.toggleTangent = function() {
  vm.showTangent = !vm.showTangent;
};


  //ellipse:
  function circle(a, b, x, r) {
      ctx3.beginPath();
      console.log(a, b, x, r);
      for (var i = 0; i < x; i++) {
        ctx3.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
        ctx3.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
        ctx3.stroke();
      }
    }

    // circle(vm.a/100, vm.b/100, 100, 250);

  vm.drawEllipse = function(a, b, theta) {
      //location of foci:

      var c = Math.sqrt(Math.abs(Math.pow(a, 2) - Math.pow(b, 2)));
      var e = c/a;
      console.log(a, b, c, e);
      ctx3.clearRect(-500,-500,10000,10000);
      console.log('drawin');

      ctx3.translate(350,350);

      circle(a, b, 100, 250);

  //draw foci:
      ctx3.fillStyle = 'green';

      ctx3.beginPath();
      if (a > b) {
        ctx3.arc(c*250, 0, 7, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();

        ctx3.beginPath();
        ctx3.arc(-c*250, 0, 7, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();

      } else if (b > a) {
        ctx3.arc(0, c*250, 7, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();

        ctx3.beginPath();
        ctx3.arc(0, -c*250, 7, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();
      }


      // console.log(vm.params);

      //ball's path:
          ctx3.beginPath();
          var x = 250*a*Math.cos((theta/100));
          var y = 250*b*Math.sin(theta/100);
          ctx3.arc(x, y, 10, 0, 2*Math.PI);
          ctx3.stroke();
          ctx3.fillStyle = 'yellow';
          ctx3.fill();

          //tracing out lines to foci:
          ctx3.beginPath();
          if (a > b) {
            ctx3.moveTo(c*250, 0);
            ctx3.lineTo(x, y);
            ctx3.stroke();

            ctx3.beginPath();
            ctx3.moveTo(-c*250, 0);
            ctx3.lineTo(x, y);
            ctx3.stroke();
          } else if (b > a) {
            ctx3.moveTo(0, c*250);
            ctx3.lineTo(x, y);
            ctx3.stroke();

            ctx3.beginPath();
            ctx3.moveTo(0, -c*250);
            ctx3.lineTo(x, y);
            ctx3.stroke();
          }


      //draw tangent:
          if (vm.showTangent) {
            //standardizing to coordinates of one unit = 100px:
            // console.log(x/250,y/250);

            var m = (Math.pow(b, 2)/Math.pow(a, 2)) * -x/y;
            // console.log(m);
            ctx3.moveTo(x-300, y-300*m);
            ctx3.lineTo(x+300, y+300*m);
            ctx3.stroke();
          }

          ctx3.translate(-350,-350);


          //what's the best way to grab the angle between focus-line and tangent?
          //Hmmm....


    }; //end DrawEllipse

    vm.drawEllipse(vm.a/100, vm.b/100, vm.theta);








  //parabola reflection:

  vm.x4=280;

  function parabola4(x, l, a, b, c, dir) {
  for (var i = 0; i < x; i++) {
    ctx4.moveTo(i*l + dir*200, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
    ctx4.lineTo((i+1)*l + dir*200, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
    ctx4.stroke();
  }
}

  vm.drawBall4 = function(x) {
    ctx4.clearRect(0,0,1000,1000);
    //path of the ball:
    ctx4.beginPath();
    // console.log(vm.x);

    // var x = 250 + iteration*2;

    //for standardizing the units:
    var xNow = (x - 500)/100;
    // console.log(xNow);

    //draw moving ball:
    ctx4.arc(x, 250 + xNow*xNow*100/(1), 6, 0, 2*Math.PI);
    ctx4.stroke();
    ctx4.fillStyle = 'green';
    ctx4.fill();

    //draw in slope:

    // console.log((x - 500)/100, (xNow*xNow*100/(1))/100);
    // console.log('m = ', 2*(vm.x4 - 500)/100);
    var xUnit = (x - 500)/100;
    var yUnit = (xNow*xNow*100/(1))/100;
    var m = 2*(x - 500)/100;

    ctx4.translate(x, 250 + xNow*xNow*100/(1));
    ctx4.moveTo(-300, -m*300);
    ctx4.lineTo(300, m*300);
    ctx4.stroke();

    ctx4.moveTo(0, 0);

    //rookie mistake -- if you come in, u gotta go back out:
    ctx4.translate(-x, -250 - xNow*xNow*100/(1));
    ctx4.lineTo(500, 250 + 25);
    ctx4.stroke();

    ctx4.moveTo(x, 250 + xNow*xNow*100/(1));
    ctx4.lineTo(x, 1000);
    ctx4.stroke();


    //re-draw parabola:
    ctx4.translate(300, 0);
    parabola4(200, 4, 1/(1), 0, 2.5, 1);
    ctx4.transform(-1, 0, 0, 1, 0, 0);
    parabola4(200, 4, 1/(1), 0, 2.5, -1);
    ctx4.transform(-1, 0, 0, 1, 0, 0);
    ctx4.translate(-300, 0);
    //redraw grid:
    ctx4.moveTo(500, 0);
    ctx4.lineTo(500, 1000);
    ctx4.stroke();
    ctx4.moveTo(0, 250);
    ctx4.lineTo(1000, 250);
    ctx4.stroke();

    //redraw in focus:
    ctx4.beginPath();
    ctx4.arc(500, 250+0.25*100, 5, 0, 2*Math.PI);
    ctx4.stroke();
    ctx4.fillStyle = 'blue';
    ctx4.fill();
    //redraw in directrix (dotted line):
    for (var i=0; i<50; i++) {
      ctx4.moveTo(i*20, 250-25);
      ctx4.lineTo(i*20+10, 250-25);
      ctx4.stroke();

    }

  }; //end of drawBall4

  vm.drawBall4(vm.x4);








  //parabola orthogonal tangents:

  vm.x3 = 300;
  console.log(vm.x3);

  function parabola3(x, l, a, b, c, dir) {
  for (var i = 0; i < x; i++) {
    ctx5.moveTo(i*l + dir*200, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
    ctx5.lineTo((i+1)*l + dir*200, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
    ctx5.stroke();
  }
}


  vm.drawBall3 = function(x) {
    ctx5.clearRect(0,0,1000,1000);
    //path of the ball:
    ctx5.beginPath();
    console.log(x);

    // var x = 250 + iteration*2;

    //for standardizing the units:
    var xNow = (x - 500)/100;
    // console.log(xNow);

    //draw moving ball:
    ctx5.arc(x, 250 + xNow*xNow*100/(1), 6, 0, 2*Math.PI);
    ctx5.stroke();
    ctx5.fillStyle = 'green';
    ctx5.fill();
    //re-draw parabola:
    ctx5.translate(300, 0);
    parabola3(200, 4, 1/(1), 0, 2.5, 1);
    ctx5.transform(-1, 0, 0, 1, 0, 0);
    parabola3(200, 4, 1/(1), 0, 2.5, -1);
    ctx5.transform(-1, 0, 0, 1, 0, 0);
    ctx5.translate(-300, 0);
    //redraw grid:
    ctx5.moveTo(500, 0);
    ctx5.lineTo(500, 1000);
    ctx5.stroke();
    ctx5.moveTo(0, 250);
    ctx5.lineTo(1000, 250);
    ctx5.stroke();

    //redraw in focus:
    ctx5.beginPath();
    ctx5.arc(500, 250+0.25*100, 5, 0, 2*Math.PI);
    ctx5.stroke();
    ctx5.fillStyle = 'blue';
    ctx5.fill();
    //redraw in directrix (dotted line):
    for (var i=0; i<50; i++) {
      ctx5.moveTo(i*20, 250-25);
      ctx5.lineTo(i*20+10, 250-25);
      ctx5.stroke();

    }

    //orthogonal tangents:
    ctx5.translate(x, 250 + xNow*xNow*100/(1));
    ctx5.moveTo(0,0);
    ctx5.lineTo(500, -2*5*(500-x));

    ctx5.stroke();
    ctx5.translate(-x, -250 - xNow*xNow*100/(1));


    ctx5.translate(500 - 100/(4*xNow), 250 + 100*Math.pow(1/(4*xNow), 2));
    ctx5.moveTo(0,0);
    ctx5.beginPath();
    ctx5.arc(0, 0, 5, 0, 2*Math.PI);
    ctx5.stroke();

    ctx5.moveTo(0,0);
    // ctx5.beginPath();
    ctx5.lineTo(-1500, 750/xNow);
    ctx5.stroke();


    //try to close triangle:
    //ahhhhh so close what am i missing?
    //ahhhh yes just translate back out before trying to grab the ball's coordinate!
    ctx5.moveTo(0,0);
    ctx5.translate(-500 + 100/(4*xNow), -250 - 100*Math.pow(1/(4*xNow), 2));

    ctx5.lineTo(x, 250 + xNow*xNow*100/(1));
    ctx5.stroke();

    // ctx5.translate(-500 + 100/(4*xNow), -250 - 100*Math.pow(1/(4*xNow), 2));

    //close the triangle:
    // ctx5.lineTo()

    // iteration++;

  }; //end of drawBall3

  vm.drawBall3(vm.x3);



});
