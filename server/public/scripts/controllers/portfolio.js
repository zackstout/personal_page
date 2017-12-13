
app.controller('PortfolioController', function($location) {
  console.log('PortfolioController created');
  var can = document.getElementById('cycloid');
  console.log(can);
  var ctx = can.getContext('2d');

  var t=0;

  ctx.translate(300, 0);
  // ctx.beginPath();
  // ctx.arc(0, 75, 75, 0, 2*Math.PI);
  // ctx.stroke();

  function moveCirc() {

    // ctx.translate(300,0);
    ctx.clearRect(-300, -300, 800, 800);
    ctx.beginPath();
    if (Math.sin(t) > 0 && Math.cos(t) > 0) {
      ctx.beginPath();
      ctx.arc(-200*Math.sin(t) - 75*Math.sin(2*t), 75 - 75*Math.cos(2*t), 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'darkblue';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-200*Math.sin(t) - 75*Math.sin(2*t), 75 - 75*Math.cos(2*t));
      ctx.lineTo(-200*Math.sin(t), 75);
      ctx.stroke();
    } else if (Math.sin(t) < 0 && Math.cos(t) > 0) {
      ctx.beginPath();
      ctx.arc(-200*Math.sin(t) - 75*Math.sin(2*t), 75 - 75*Math.cos(2*t), 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'darkblue';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-200*Math.sin(t) - 75*Math.sin(2*t), 75 - 75*Math.cos(2*t));
      ctx.lineTo(-200*Math.sin(t), 75);
      ctx.stroke();
    } else if (Math.sin(t) > 0 && Math.cos(t) < 0) {
      ctx.beginPath();
      ctx.arc(-200*Math.sin(t) + 75*Math.sin(2*t), 75 - 75*Math.cos(2*t), 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'darkblue';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-200*Math.sin(t) + 75*Math.sin(2*t), 75 - 75*Math.cos(2*t));
      ctx.lineTo(-200*Math.sin(t), 75);
      ctx.stroke();
    } else if (Math.sin(t) < 0 && Math.cos(t) < 0) {
      ctx.beginPath();
      ctx.arc(-200*Math.sin(t) + 75*Math.sin(2*t), 75 - 75*Math.cos(2*t), 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'darkblue';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-200*Math.sin(t) + 75*Math.sin(2*t), 75 - 75*Math.cos(2*t));
      ctx.lineTo(-200*Math.sin(t), 75);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(-200*Math.sin(t), 75, 75, 0, 2*Math.PI);
    ctx.stroke();
    t += 0.05;
    // ctx.translate(-300,0);
    // console.log(Math.cos(t));


    // ctx.beginPath();
    // ctx.arc(100*(t - Math.sin(t)), 100*(1 - Math.cos(t)), 10, 0, 2*Math.PI);
    // ctx.stroke();

  }

  setInterval(moveCirc, 60);

});
