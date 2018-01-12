

app.controller('MathController', function($location, $scope, $anchorScroll, $compile) {
  console.log('mathController created');

  vm = this;

  vm.goToPost = function(n) {
    $anchorScroll('post' + n);
  };





        var phi = 1.61803;

        var canvas0 = document.getElementById('sierptriangle');
        var ctx0 = canvas0.getContext('2d');

        var vertices = [];

        function drawSierpTriangle(s) {
          // ctx0.beginPath();
          // ctx0.arc(250, 50, 10, 0, 2*Math.PI);
          // ctx0.stroke();
          // vertices.push({x: 250, y:50});
          //
          // ctx0.beginPath();
          // ctx0.arc(250 + s, 50 + s*Math.pow(3, 0.5), 10, 0, 2*Math.PI);
          // ctx0.stroke();
          // vertices.push({x: 250 + s, y:50 + s*Math.pow(3, 0.5)});
          //
          // ctx0.beginPath();
          // ctx0.arc(250 - s, 50 + s*Math.pow(3, 0.5), 10, 0, 2*Math.PI);
          // ctx0.stroke();
          // vertices.push({x: 250 - s, y:50 + s*Math.pow(3, 0.5)});



          // Pentagon:
          ctx0.beginPath();
          ctx0.arc(50, 200, 10, 0, 2*Math.PI);
          ctx0.stroke();
          vertices.push({x: 50, y:200});

          ctx0.beginPath();
          ctx0.arc(450, 200, 10, 0, 2*Math.PI);
          ctx0.stroke();
          vertices.push({x: 450, y:200});

          ctx0.beginPath();
          ctx0.arc(100, 420, 10, 0, 2*Math.PI);
          ctx0.stroke();
          vertices.push({x: 100, y:420});

          ctx0.beginPath();
          ctx0.arc(400, 420, 10, 0, 2*Math.PI);
          ctx0.stroke();
          vertices.push({x: 400, y:420});

          // ctx0.beginPath();
          // ctx0.arc(250, 50, 10, 0, 2*Math.PI);
          // ctx0.stroke();
          // vertices.push({x: 250, y:50});
        }

        drawSierpTriangle(200);

        ctx0.beginPath();
        ctx0.arc(325, 270, 0.25, 0, 2*Math.PI);
        // ctx0.stroke();
        ctx0.fillStyle = 'black';
        ctx0.fill();
        var start = {x: 325, y: 270};

        function drawRandomPoint2() {
          var random = Math.floor(Math.random() * vertices.length);
          var maxX = Math.max(vertices[random].x, start.x);
          var minX = Math.min(vertices[random].x, start.x);
          var maxY = Math.max(vertices[random].y, start.y);
          var minY = Math.min(vertices[random].y, start.y);

          var newPoint = {x: minX + (maxX - minX)/2, y: minY + (maxY - minY)/2};
          ctx0.beginPath();
          ctx0.arc(newPoint.x, newPoint.y, 0.25, 0, 2*Math.PI);
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

        vm.startSierp = function() {
          setInterval(drawRandomPoint2, 0.01);
        };





    var canvas1 = document.getElementById('binaryCount');
    var ctx1 = canvas1.getContext('2d');


    // var canvas2 = document.getElementById('parabola');
    // var ctx2 = canvas2.getContext('2d');

    var canvas = document.getElementById('ball');
    var ctx = canvas.getContext('2d');

    // var canvas6 = document.getElementById('parabolaBall');
    // var ctx6 = canvas6.getContext('2d');
    //
    // var canvas7 = document.getElementById('polygon');
    // var ctx7 = canvas7.getContext('2d');

    var canvas3 = document.getElementById('ellipse');
    var ctx3 = canvas3.getContext('2d');

    var canvas4 = document.getElementById('parabReflection');
    var ctx4 = canvas4.getContext('2d');

    var canvas5 = document.getElementById('parabOrth');
    var ctx5 = canvas5.getContext('2d');

    var golden = document.getElementById('golden');
    var ctx9 = golden.getContext('2d');

    var line = document.getElementById('line');
    var ctx10 = line.getContext('2d');

    var twoLeaves = document.getElementById('twoLeaves');
    var ctx11 = twoLeaves.getContext('2d');

    var inf = document.getElementById('infinity');
    var ctx12 = inf.getContext('2d');




            var numHolder = document.getElementById('binNumHolder');
            var numHolder2 = document.getElementById('binNumHolder2');
            var numHolder3 = document.getElementById('binNumHolder3');

            var numHolderEl = angular.element(numHolder);
            var numHolderEl2 = angular.element(numHolder2);
            var numHolderEl3 = angular.element(numHolder3);


                              //hmm not quite sure how to reset yet:
                              // snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
                              // tail = {r: 1, c: 1};
                              // direction = 'd';
                              // return;




            var allSnakeCells = [];
            var snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
            // starting "ghost tail" i.e. dummy:
            var tail = {r: 1, c: 1};
            var direction = 'd';

            //drawing the snake grid:
            function snakeGrid(s) {
              var snakeGrid = angular.element(document.getElementById('snakeTable'));
              var snakeRow = [];

              for (var k=0; k < s; k++) {
                for (var i=0; i < s; i++) {
                  snakeRow.push('<td><div id="col' + i + 'row' + k + '" class="snakeCell"></div> </td>');
                }
                var fullRow = '<tr>' + snakeRow + '</tr>';
                snakeGrid.append($compile(fullRow)($scope));
                snakeRow = [];
              }
            }

            function changeSnake() {

              //toggle old tail back to blue:
              var name1 = 'col' + tail.c + 'row' + tail.r;
              document.getElementById(name1).className = 'snakeCell';

              //had to change this to account for variable length:
              var head = snake[snake.length - 1];

              //get current direction:
              switch(direction) {
                case 'd':
                if (head.r + 1 == 16) {
                  alert('Whoops! You hit the wall.');
                  clearInterval(snakeInt);
                }
                newHead = {
                  r: head.r + 1,
                  c: head.c
                };
                break;

                case 'u':
                newHead = {
                  r: head.r - 1,
                  c: head.c
                };
                if (head.r - 1 == -2) {
                  alert('Whoops! You hit the wall.');
                  clearInterval(snakeInt);
                  // return;
                }
                break;

                case 'l':
                newHead = {
                  r: head.r,
                  c: head.c - 1
                };
                if (head.c - 1 == -2) {
                  alert('Whoops! You hit the wall.');
                  clearInterval(snakeInt);
                  // return;
                }
                break;

                case 'r':
                newHead = {
                  r: head.r,
                  c: head.c + 1
                };
                if (head.c + 1 == 16) {
                  alert('Whoops! You hit the wall.');
                  clearInterval(snakeInt);
                  // return;
                }
                break;
              } //end switch statement

              //draw snake:
              snake.forEach(function(cell) {
                var name = 'col' + cell.c + 'row' + cell.r;
                var el = document.getElementById(name);
                el.className = 'snakeLive';
              });

              // move tail to new head; if eating an apple, do not remove tail from snake:
              if (head.r == apple.r && head.c == apple.c) {
                tail = snake[0];
                head = snake[snake.length - 1];
                //generate new apple:
                apple.r = Math.floor(Math.random()*15);
                apple.c = Math.floor(Math.random()*15);
                var appleCell = 'col' + apple.c + 'row' + apple.r;
                document.getElementById(appleCell).className = 'apple';
              } else {
                tail = snake.shift();
                head = snake[snake.length - 1];
              }
              snake.push(newHead);
            }

            window.onkeydown = function(e) {
              // console.log(e.keyCode);
              switch(e.keyCode) {
                case 83:
                direction = 'd';
                break;

                case 68:
                direction = 'r';
                break;

                case 87:
                direction = 'u';
                break;

                case 65:
                direction = 'l';
                break;
              }
              // console.log(direction);
            };

            snakeGrid(15);


            var apple = {r: 10, c: 1};
            var appleCell = 'col' + apple.c + 'row' + apple.r;
            document.getElementById(appleCell).className = 'apple';

            changeSnake();

            var snakeInt;
            vm.startSnake = function() {
              snakeInt = setInterval(changeSnake, 260);
            };








            vm.params = { p: 0.25 };

            vm.m = 4;


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
















      ctx10.moveTo(10, 20);
      ctx10.lineTo(390, 20);
      ctx10.stroke();
      ctx10.moveTo(244.85, 10);
      ctx10.lineTo(244.85, 30);
      ctx10.stroke();

      function drawLeaf2(l) {
        //just for fun:
        var r = l * phi;
        var theta = Math.asin(l/r);
        ctx11.beginPath();
        ctx11.arc(Math.pow((r*r - l*l), 0.5), -l, r, Math.PI - theta, Math.PI + theta);
        ctx11.stroke();

        ctx11.beginPath();
        ctx11.arc(-Math.pow((r*r - l*l), 0.5), -l, r, -theta, theta);
        ctx11.stroke();
      }

      ctx11.translate(250, 250);

      drawLeaf2(120);
      ctx11.rotate(2*Math.PI/phi);
      drawLeaf2(105);


      ctx9.translate(250, 250);

      function drawLeaf(l) {
        //just for fun:
        var r = l * phi;
        var theta = Math.asin(l/r);
        ctx9.beginPath();
        ctx9.arc(Math.pow((r*r - l*l), 0.5), -l, r, Math.PI - theta, Math.PI + theta);
        ctx9.stroke();

        ctx9.beginPath();
        ctx9.arc(-Math.pow((r*r - l*l), 0.5), -l, r, -theta, theta);
        ctx9.stroke();
      }

      var startLength = 120;

      for (var i=0; i<20; i++) {
        drawLeaf(startLength);
        ctx9.rotate(2*Math.PI/phi);
        startLength *= 0.88;
      }








      // ctx12.translate(250, 250);
      ctx12.moveTo(50, 0);
      ctx12.lineTo(50, 500);
      ctx12.stroke();
      ctx12.moveTo(0, 250);
      ctx12.lineTo(500, 250);
      ctx12.stroke();

      ctx12.beginPath();
      ctx12.arc(50, 250, 200, 3*Math.PI/2, 0);
      ctx12.stroke();

      vm.infinitize = function(x) {
        ctx12.clearRect(0, 0, 2000, 2000);

        //redraw:
        //note: need to beginPath here in order to avoid glitchiness:
        ctx12.beginPath();
        ctx12.moveTo(50, 0);
        ctx12.lineTo(50, 500);
        ctx12.stroke();
        ctx12.moveTo(0, 250);
        ctx12.lineTo(500, 250);
        ctx12.stroke();

        ctx12.beginPath();
        ctx12.arc(50, 250, 200, 3*Math.PI/2, 0);
        ctx12.stroke();

        xCoord = 250 - (200-x);
        ctx12.moveTo(xCoord, 250);
        xAdj = (xCoord - 50)/200;
        yAdj = Math.pow(1 - Math.pow(xAdj, 2), 0.5);
        yCoord = 250 - yAdj * 200;
        // console.log(xAdj, 'and ', yAdj);
        ctx12.lineTo(xCoord, yCoord);
        ctx12.stroke();

        xNew = xCoord - 50;
        yNew = yCoord - 50;
        // console.log(xNew, yNew);
        slope = yNew / xNew;
        // console.log(slope);
        xEnd = 200/slope;
        ctx12.moveTo(50, 50);
        ctx12.lineTo(50 + xEnd, 250);
        ctx12.stroke();
        //
        // slope = -xAdj / (Math.pow(1 - xAdj * xAdj, 0.5));
        // console.log(slope);
        //
        // ctx12.moveTo(xCoord, yCoord);
        // ctx12.lineTo(xCoord + 100 / -slope, 250);
        // ctx12.stroke();

        //x is between 1 and 200:
        // var newX = -(200 - x);
        // ctx12.arc(newX, 0, 7, 0, 2*Math.PI);
        // ctx12.stroke();
        //
        // ctx12.moveTo(newX, 0);
        // ctx12.lineTo(newX, -Math.pow(1 - Math.pow(newX, 2)/100), 0.5);
        // ctx12.stroke();
      };











      binCount = 0;
      vm.binaryNum = 0;

      vm.goBack = function() {
        if (binCount != 0) {
          binCount --;
        }
        renderBinCount(binCount);
      };

      vm.goForward = function() {
        if (binCount != 15) {
          binCount ++;
        }
        renderBinCount(binCount);
      };

      renderBinCount(0);
      console.log(numHolder);
      console.log(angular.element(numHolder));
      console.log(numHolderEl);
      numHolderEl.text('0');

    //could write a function to abstract the rectangle drawing....but need their size, as well as horizontal and vertical position. almost doesn't seem worth it if we can't find a pattern.

    //draw the rectangle with size (0, 1, 2 or 3), horizontal position (0, 1 or 2), and vertical position (1, 2, 3 or 4):
      function drawRect(s, h, v) {

        ctx1.translate(200*h + 100, 250);
        switch(s) {
          case 0:
            ctx1.fillStyle = 'yellow';
            break;
          case 1:
            ctx1.fillStyle = 'green';
            break;
          case 2:
            ctx1.fillStyle = 'blue';
            break;
          case 3:
            ctx1.fillStyle = 'purple';
            break;
        }
        ctx1.fillRect(-10*s - 20, -v*15, 40 + s*20, 20);
        ctx1.translate(-200*h - 100, -250);

        //silly me, actually thought we needed a switch to deal with this stuff. that's the point of arguments! just got too into switchin lol
      }


      function renderBinCount(x) {
        // console.log(x);

        //thirds are from 0-200, 200-400, 400-600:
        switch(x) {
          case 0:
          ctx1.clearRect(0, 0, 600, 600);

          drawRect(0, 0, 4);
          drawRect(1, 0, 3);
          drawRect(2, 0, 2);
          drawRect(3, 0, 1);

          // ctx1.translate(100, 250);
          // ctx1.fillRect(-50, -15, 100, 20);
          // ctx1.fillRect(-40, -30, 80, 20);
          // ctx1.fillRect(-30, -45, 60, 20);
          // ctx1.fillRect(-20, -60, 40, 20);
          // ctx1.translate(-100, -250);
          //
          // console.log(0);
          numHolderEl.text('0');
          numHolderEl2.text('');
          numHolderEl3.text('');

          break;

          case 1:
          ctx1.clearRect(0, 0, 600, 600);

          drawRect(0, 1, 1);
          drawRect(1, 0, 3);
          drawRect(2, 0, 2);
          drawRect(3, 0, 1);

          numHolderEl.text('');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 2:
          ctx1.clearRect(0, 0, 600, 600);

          drawRect(0, 1, 1);
          drawRect(1, 2, 1);
          drawRect(2, 0, 2);
          drawRect(3, 0, 1);

          numHolderEl.text('');
          numHolderEl2.text('1');
          numHolderEl3.text('0');

          break;

          case 3:
          ctx1.clearRect(0, 0, 600, 600);

          drawRect(0, 2, 2);
          drawRect(1, 2, 1);
          drawRect(2, 0, 2);
          drawRect(3, 0, 1);

          numHolderEl.text('1');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 4:
          ctx1.clearRect(0, 0, 600, 600);

          drawRect(0, 2, 2);
          drawRect(1, 2, 1);
          drawRect(2, 1, 1);
          drawRect(3, 0, 1);

          numHolderEl.text('');
          numHolderEl2.text('1');
          numHolderEl3.text('00');      break;

          case 5:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 0, 2);
          drawRect(1, 2, 1);
          drawRect(2, 1, 1);
          drawRect(3, 0, 1);
          numHolderEl.text('10');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 6:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 0, 2);
          drawRect(1, 1, 2);
          drawRect(2, 1, 1);
          drawRect(3, 0, 1);
          numHolderEl.text('1');
          numHolderEl2.text('1');
          numHolderEl3.text('0');

          break;

          case 7:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 1, 3);
          drawRect(1, 1, 2);
          drawRect(2, 1, 1);
          drawRect(3, 0, 1);
          numHolderEl.text('11');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 8:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 1, 3);
          drawRect(1, 1, 2);
          drawRect(2, 1, 1);
          drawRect(3, 2, 1);
          numHolderEl.text('');
          numHolderEl2.text('1');
          numHolderEl3.text('000');
          break;

          case 9:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 2, 2);
          drawRect(1, 1, 2);
          drawRect(2, 1, 1);
          drawRect(3, 2, 1);
          numHolderEl.text('100');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 10:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 2, 2);
          drawRect(1, 0, 1);
          drawRect(2, 1, 1);
          drawRect(3, 2, 1);
          numHolderEl.text('10');
          numHolderEl2.text('1');
          numHolderEl3.text('0');
          break;

          case 11:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 0, 2);
          drawRect(1, 0, 1);
          drawRect(2, 1, 1);
          drawRect(3, 2, 1);
          numHolderEl.text('101');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 12:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 0, 2);
          drawRect(1, 0, 1);
          drawRect(2, 2, 2);
          drawRect(3, 2, 1);
          numHolderEl.text('1');
          numHolderEl2.text('1');
          numHolderEl3.text('00');
          break;

          case 13:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 1, 1);
          drawRect(1, 0, 1);
          drawRect(2, 2, 2);
          drawRect(3, 2, 1);
          numHolderEl.text('110');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;

          case 14:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 1, 1);
          drawRect(1, 2, 3);
          drawRect(2, 2, 2);
          drawRect(3, 2, 1);
          numHolderEl.text('11');
          numHolderEl2.text('1');
          numHolderEl3.text('0');
          break;

          case 15:
          ctx1.clearRect(0, 0, 600, 600);
          drawRect(0, 2, 4);
          drawRect(1, 2, 3);
          drawRect(2, 2, 2);
          drawRect(3, 2, 1);
          numHolderEl.text('111');
          numHolderEl2.text('1');
          numHolderEl3.text('');
          break;
        }
      }










});
