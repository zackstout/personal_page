

//
var ctx, can;

(function(window, document, undefined){

window.onload = init;

  function init(){
    can = document.getElementById('mandelbrot');
    ctx = can.getContext('2d');
    drawMandelbrot();
  }

})(window, document, undefined);


function drawMandelbrot() {
  var mag = 260;
  var panX = 2;
  var panY = 1.5;

  // var mag = 13000;
  // var panX = 0.56;
  // var panY = 0.64;

  for (var x=0; x < can.width; x++) {
    for (var y=0; y < can.height; y++) {
      var result = checkMandelbrot(x/mag - panX, y/mag - panY);
      // if (result) {
      //   ctxMan.fillStyle = 'black';
      //   ctxMan.fillRect(x, y , 1, 1);
      // }

      if (result == 0) {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = 'hsl(284, 100%, ' + result + '%)';
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function checkMandelbrot(x, y) {
  var maxIt = 500;
  realComp = x;
  imagComp = y;
  for (var i=0; i < maxIt; i++) {
    tempReal = realComp * realComp - imagComp * imagComp + x;
    tempImag = 2 * realComp * imagComp + y;
    realComp = tempReal;
    imagComp = tempImag;

    if (realComp * imagComp > 5) {
      return i/maxIt * 100;
    }
  }

  // if (realComp * imagComp < 5) {
  //   return true;
  // }



  return 0;

  // return false;
}





function drawJulia(r, i) {
  var mag = 45;
  var panX = -0.5;
  var panY = 0.5;
  var color;

  for (var x=0; x < canvasMan.width; x++) {
    for (var y=0; y < canvasMan.height; y++) {
      tempReal = 1.5 * (x - canvasMan.width/2)/(0.5*mag*canvasMan.width) + panX;
      tempIm = (y - canvasMan.height/2)/(0.5 * mag * canvasMan.height) + panY;

      var maxIt = 80;
      for (var j=0; j < maxIt; j++) {
        real = tempReal;
        imag = tempIm;
        tempReal = real * real - imag * imag + r;
        tempIm = 2 * real * imag + i;

        if ((real * real + imag * imag) > 4) {
          color = j/maxIt * 100;
          ctxMan.fillStyle = 'hsl(284, 100%, ' + color + '%)';
          ctxMan.fillRect(x, y, 1, 1);
          break;
        }

      }

    }
  }

}

// drawJulia(-0.5, 0.02);

//-0.7, 0.27015, zoom factor 1.
//0.279, 0
//-0.3, 0.7 // 4, -0.3 ,0.4 OR 3, -0.2, 0
//-0.5, 0.02, and then -0.5, 0.5 to zoom almost infintiely!!!
