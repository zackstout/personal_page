
const PHI = 1.61803399;
const PI = Math.PI;

let ctx;
let start = 200;

//thank you stackoverflow:
//i believe we need this because we're using templates, so when the original scripts loaded, our canvas wasn't on the DOM yet.
(function(window, document, undefined){

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
    let canvas = document.getElementById('can');
    console.log(canvas);
    ctx = canvas.getContext('2d');
    drawLeaf(start);
  }

})(window, document, undefined);

function drawLeaf() {
  //do it as a global variable in order to use setInterval later:
  l = start;
  let r = l * PHI;
  let theta = Math.asin(l/r);
  ctx.translate(400, 400);

  ctx.beginPath();
  ctx.arc(Math.pow((r*r - l*l), 0.5), -l, r, PI - theta, PI + theta);
  ctx.stroke();

  // ctx.beginPath();
  ctx.arc(-Math.pow((r*r - l*l), 0.5), -l, r, -theta, theta);
  ctx.stroke();
  //nice, we just need to use closePath in order to fill:
  ctx.closePath();

  ctx.fillStyle = getRandomColor();
  //oh right, we don't pass anything to fill in canvas, that's just p5.
  ctx.fill();

  ctx.rotate(2*PI/PHI);

  ctx.translate(-400, -400);

  start *= 0.94;
}

//thank you stackoverflow:
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let startFlower = setInterval(drawLeaf, 800);
