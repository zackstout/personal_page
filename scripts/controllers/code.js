

app.controller('CodeController', function($location, $scope, $anchorScroll, $compile) {
  console.log('CodeController created');

  vm = this;

  vm.goToPost = function(n) {
    $anchorScroll('post' + n);
  };


  vm.params = { p: 0.25 };

  vm.m = 4;





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
    snakeInt = setInterval(changeSnake, 230);
  };


  // var canvas1 = document.getElementById('binaryCount');
  // var ctx1 = canvas1.getContext('2d');


  var canvas2 = document.getElementById('parabola');
  var ctx2 = canvas2.getContext('2d');
  //
  // var canvas = document.getElementById('ball');
  // var ctx = canvas.getContext('2d');

  var canvas6 = document.getElementById('parabolaBall');
  var ctx6 = canvas6.getContext('2d');

  var canvas7 = document.getElementById('polygon');
  var ctx7 = canvas7.getContext('2d');

  // var canvas3 = document.getElementById('ellipse');
  // var ctx3 = canvas3.getContext('2d');
  //
  // var canvas4 = document.getElementById('parabReflection');
  // var ctx4 = canvas4.getContext('2d');
  //
  // var canvas5 = document.getElementById('parabOrth');
  // var ctx5 = canvas5.getContext('2d');
  //
  // var golden = document.getElementById('golden');
  // var ctx9 = golden.getContext('2d');
  //
  // var line = document.getElementById('line');
  // var ctx10 = line.getContext('2d');
  //
  // var twoLeaves = document.getElementById('twoLeaves');
  // var ctx11 = twoLeaves.getContext('2d');
  //
  // var inf = document.getElementById('infinity');
  // var ctx12 = inf.getContext('2d');



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
    console.log('hi', a);
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
















  vm.html11 = '<select ng-model="uc.chartView" ng-change="uc.changeChartView()">';
  vm.html12 = '<option value="projects">Project</option>';
  vm.html13 = '<option value="months">Month</option>';
  vm.html14 = '<option value="types">Type</option>';
  vm.html15 = '<option value="countries">Country</option>';
  vm.html16 = '</select>';

  vm.html31 = '<button ng-click="uc.getChartData(uc.chartView,';
  vm.html32 = 'uc.chartParticular, uc.chartSlice)">Submit</button>';

  vm.html2a = '<select ng-show="uc.activeSelector == \'projects\'"';
  vm.html2b = 'ng-model="uc.chartParticular">';
  vm.html2c = '<option ng-repeat="res in uc.chartResults"';
  vm.html2d = 'value="res.project">{{res.project}}</option>';
  vm.html2e = '</select>';

  vm.html21 = '<select ng-show="uc.activeSelector == \'projects\'" ng-model="uc.chartParticular">';
  vm.html22 = '  <option ng-repeat="res in uc.chartResults" value="res.project">{{res.project}}</option>';
  vm.html23 = '</select>';
  vm.html24 ='<select ng-show="uc.activeSelector == \'months\'" ng-model="uc.chartParticular">';
  vm.html25 ='  <option ng-repeat="res in uc.chartResults" value="res.month">{{res.month}}</option>';
  vm.html26 ='</select>';
  vm.html27 ='<select ng-show="uc.activeSelector == \'types\'" ng-model="uc.chartParticular">';
  vm.html28 ='  <option ng-repeat="res in uc.chartResults" value="res.type">{{res.type}}</option>';
  vm.html29 ='</select>';
  vm.html210 ='<select ng-show="uc.activeSelector == \'countries\'" ng-model="uc.chartParticular">';
  vm.html211 ='  <option ng-repeat="res in uc.chartResults" value="res.country">{{res.country}}</option>';
  vm.html212 = '</select>';









  //note: should be an id, but then we have to change the slice...
  var valuesOnGrid = [];

  //yep, needed getAttribute to grab the class, nice, that's a third new thing learned:
  vm.checkBoxMine = function(ev) {
    //keep in mind that this will only work for single digit numbers!!:
    var row = ev.target.getAttribute("class").slice(14, 15);
    var col = ev.target.getAttribute("class").slice(18, 19);
    console.log("row: ", row, ", col: ", col);

    console.log(angular.element(ev.currentTarget).parent());
    var cell = angular.element(ev.currentTarget).parent();
    //ok good this will remove the button:
    ev.currentTarget.remove();

    //yesssss it works, wunderbar:
    //except now we're calling it on grid draw instead of on click:
    // checkForBombs(row, col, 5);

    //ooooh i think i see the problem; it's only finding the number for each square AFTER we click it.
    //we need to find them all at the beginning.
    openUpGrid(row, col);

    //ok new plan, can we loop through an array or object and append the appropriate value to the spot which is the parent of the clicked button?
    //yassss this works as well:
    var valueOnGrid = valuesOnGrid[row][col];
    cell.append(valueOnGrid);
    //ok now we're in business. now the question is, how do we model the grid? as an array of arrays of values, e.g. number strings and bombs? if one could save object properties with numeral keys

    console.log(getNeighbors(row, col, 5));

  };


  //perfect, this will draw the grid! But the ng-click won't work.....we needed $compile!!!!! yes!
  //wonderful, now we can (using $event) see which button was clicked!
  function drawGridMines(x) {
    var mineSweep = angular.element(document.getElementById('mineSweep'));
    var mineRow = [];
    var mineRowVals = [];
    for (var k=0; k<x; k++) {
      for (var i=0; i<x; i++) {
        mineRow.push('<td><button class="mineButton row' + k + 'col' + i + '"  ng-click="cc.checkBoxMine($event)"> </button></td>');
        mineRowVals.push('0');
      }
      var fullRow = '<tr>' + mineRow + '</tr>';
      mineSweep.append($compile(fullRow)($scope));
      mineRow = [];

      valuesOnGrid.push(mineRowVals);
      mineRowVals = [];
    }
    // console.log(valuesOnGrid);
    var mines = generateMines();
    // console.log(mines);
    //i suppose the disadvantage of doing it with bare arrays is that it's harder to alter the value of a single element. Oh no, apparently it's easy.
    for (var j=0; j<mines.length; j++) {
      var mine = mines[j];
      valuesOnGrid[mine.row][mine.col] = 'b';
    }

    //success!!!
    // console.log(valuesOnGrid);

    //wow kind of can't believe this worked:
    valuesOnGrid.forEach(function(arr, index) {
      var ind = index;
      arr.forEach(function(v, index) {
        checkForBombs(ind, index, 5);
      });
    });

  }


  //yessss it appears to work, ok after accounting for r==0 it does work:
  function getNeighbors(r, c, s) {
    neighbors = [];
    var R = parseInt(r);
    var C = parseInt(c);

    if (R>0) {
      neighbors.push({row: R-1, col: C});
      // neighbors.push({row: r-1, col: c+1});
      if (c>0) {
        neighbors.push({row: R, col: C-1});
        neighbors.push({row: R-1, col: C-1});
      }
      if (c < s-1) {
        neighbors.push({row: R, col: C+1});
        neighbors.push({row: R-1, col: C+1});
      }
    } else {
      if (c>0) {
        neighbors.push({row: R, col: C-1});
      }
      if (c < s-1) {
        neighbors.push({row: R, col: C+1});
      }
    }

    if (r < s-1 ) {
      neighbors.push({row: R+1, col:C});

      if (c>0) {
        neighbors.push({row: R+1, col: C-1});
      }
      if (c < s-1) {
        neighbors.push({row: R+1, col: C+1});
      }
    }

    return neighbors;
  }


  function generateMines() {
    return [{row: 4, col: 2}, {row: 4, col: 3}, {row: 4, col: 0}, {row: 1, col: 2}, {row: 3, col: 1}, {row: 1, col: 0}];

  }


  function checkForBombs(r, c, s) {
    var neighbors = getNeighbors(r, c, s);
    var v = valuesOnGrid[r][c];

    if (v != 'b') {
      var intV = parseInt(v);
      for (var i=0; i<neighbors.length; i++) {
        var n = neighbors[i];
        var val = valuesOnGrid[n.row][n.col];

        if (val == 'b') {
          intV ++;
        }
      }
      valuesOnGrid[r][c] = String(intV);
    }

  }

  //ok so what do we need to do to open up squares.....
  //check all neighbors. if any is 0, reveal it and all of its neighbors.
  //if any of those revealed neighbors is 0, repeat for that neighbor.

  var newNeighbors = [];

  function openUpGrid(r, c) {
    var valueOnGrid = valuesOnGrid[r][c];
    var neighbors = getNeighbors(r, c, 5);

    checkForZeros(r, c);
    console.log(newNeighbors);

    //YES! it works. Removes the zeros too though.....well let's just add them back!:
    newNeighbors.forEach(function(n) {
      var cell = document.getElementsByClassName('row' + n.charAt(0) + 'col' + n.charAt(1))[0];
      console.log(cell);
      var realCell = angular.element(cell);
      console.log(realCell);
      realCell.parent().append(valuesOnGrid[n.charAt(0)][n.charAt(1)]);
      realCell.remove();

      //all right this is close but not quite there....:
      var nunuNeighbors = getNeighbors(n.charAt(0), n.charAt(1));
      nunuNeighbors.forEach(function(x) {
        var cell1 = document.getElementsByClassName('row' + x.row + 'col' + x.col)[0];
        console.log(cell1);
        if (cell1) {
          var realCell1 = angular.element(cell1);
          realCell1.parent().append(valuesOnGrid[x.row][x.col]);
          realCell1.remove();
        }
      });

      // console.log(cell);
    });
  }

  //i believe this is working: we just needed to call it once on the clicked thing, instead of for every neighbor of the original.
  function checkForZeros(r, c) {
    var neighbors = getNeighbors(r, c, 5);
    neighbors.forEach(function(n) {
      var pos = String(n.row) + String(n.col);
      if (valuesOnGrid[n.row][n.col] === '0' && !newNeighbors.includes(pos)) {
        newNeighbors.push(pos);
        checkForZeros(n.row, n.col);
      }
    });
  }


  drawGridMines(5);








  function makeChart() {

    var chart = new Chart(document.getElementById("chartdemo").getContext('2d'), {
      type: 'line',
      data: {
        labels: ['04/12', '05/12', '06/12', '07/12', '08/12', '09/12', '10/12', '11/12', '12/12', '01/13', '02/13'],
        datasets: [{
          //make an array with the sum of all categories
          data: [1,2,1,2,2,2,3,4,3,2,1],
          label: "CO2",
          borderColor: "#3e95cd",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
          fill: false
        }
      ]
    },
    options: {
      //hmm....if we turn this off, it stops screaming, but also looks kinda bad...Oh well. Ah, just need to resize the canvas and put it in a centered div!:
      responsive: false,
      // animation: false,
      title: {
        display: true,
        text: 'Carbon Footprint'
      }
    }
  });

  // chart.update();

}

makeChart();


function makeChart2() {

  var chart = new Chart(document.getElementById("chartdemo2").getContext('2d'), {
    //ahh yes, must correctly spell:
    type: 'doughnut',
    data: {
      labels: ['Living', 'Shipping', 'Travel'],
      datasets: [{
        data: [1,2,4],
        label: "CO2",
        borderColor: "#3e95cd",
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
        fill: false
      }
    ]
  },
  options: {
    //hmm....if we turn this off, it stops screaming, but also looks kinda bad...Oh well. Ah, just need to resize the canvas and put it in a centered div!:
    responsive: false,
    // animation: false,
    title: {
      display: true,
      text: 'Carbon Footprint'
    }
  }
});

// chart.update();

}

makeChart2();





});
