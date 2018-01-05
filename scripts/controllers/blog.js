

app.controller('BlogController', function($location, $scope, $anchorScroll, $compile) {
  console.log('BlogController created');

  vm = this;
  vm.params = { p: 0.25 };

  vm.m = 4;

  vm.goToPost = function(n) {
    $anchorScroll('post'+n);
  };

  var sweeper = document.getElementById('mineSweeper');
  console.log(sweeper);
  // sweeper.append();

  // Ok we need
  // (1) a way to attach id to each button/data cell. i.e. angular element append or something
  // (2) a way to generate 10 random bombs (taking into account whether that square has been bombed already)
  // (3) how does it work? how are the islands delineated by the program?
  // (4) function to calculate how many bombs are adjacent to each square in the island
  // (5) right click to flag a square

  function countAndSay(x) {
    if (x == 1) {
      return 1;
    } else if (x == 2) {
      return 11;
    } else {
      var stringToSay = String(countAndSay(x-1));
      var result = [];
      var count = 1;
      for (var i=1; i<stringToSay.length; i++) {
        if (stringToSay.charAt(i) == stringToSay.charAt(i - 1)) {
          count ++;
          if (stringToSay.length - 1 == i) {
            result.push({
              int: stringToSay.charAt(i),
              count: count
            });
          }
        } else {
          result.push({
            int: stringToSay.charAt(i - 1),
            count: count
          });
          if (stringToSay.length - 1 == i) {
            result.push({
              int: stringToSay.charAt(i),
              count: count
            });
          }
          count = 1;
        }
      }
      var realRes = '';
      for (var j=0; j<result.length; j++) {
        realRes += result[j].count;
        realRes += result[j].int;
      }
      return realRes;
    }
  }
  console.log(countAndSay(7));

  function areFriends(p, q) {
    var x = String(p);
    var y = String(q);
    for (var i=0; i<x.length; i++) {
      var n1 = x[i];
      for (var j=0; j<y.length; j++) {
        var n2 = y[j];
        if (n1 == n2) {
          return true;
        }
      }
    }
    return false;
  }

  function numOfFriends(x) {
    var res = 0;
    for (var i=1; i<x; i++) {
      for (var j=i+1; j<x; j++) {
        if (areFriends(i, j)) {
          res ++;
        }
      }
    }
    return res;
  }

  var n = Math.pow(10, 18);
  console.log(numOfFriends(100));


  var canvas1 = document.getElementById('binaryCount');
  var ctx1 = canvas1.getContext('2d');


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

  var golden = document.getElementById('golden');
  var ctx9 = golden.getContext('2d');

  var line = document.getElementById('line');
  var ctx10 = line.getContext('2d');

  var twoLeaves = document.getElementById('twoLeaves');
  var ctx11 = twoLeaves.getContext('2d');

  var inf = document.getElementById('infinity');
  var ctx12 = inf.getContext('2d');






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
      mineRow.push('<td><button class="mineButton row' + k + 'col' + i + '"  ng-click="bc.checkBoxMine($event)"> </button></td>');
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






  var numHolder = document.getElementById('binNumHolder');
  var numHolder2 = document.getElementById('binNumHolder2');
  var numHolder3 = document.getElementById('binNumHolder3');

  var numHolderEl = angular.element(numHolder);
  var numHolderEl2 = angular.element(numHolder2);
  var numHolderEl3 = angular.element(numHolder3);

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


// jeez this whole monster sure is turning into a bloated behemoth of code:
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




  // var canvas8 = document.getElementById('triangle');
  // var ctx8 = canvas8.getContext('2d');
  var phi = 1.61803;

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
