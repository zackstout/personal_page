
app.controller('AboutController', function($location) {
  console.log('AboutController created');

  var canvas = document.getElementById('pendulum');
  console.log(canvas);
  var ctx = canvas.getContext('2d');

  ctx.moveTo(100, 0);
  ctx.lineTo(100, 150);
  ctx.stroke();

  var t=0;
  var l=125;

  ctx.translate(100, 0);

  function oscillatePendulum() {
    ctx.clearRect(-100,0,200,200);
    var theta = 40*Math.sin(t);

    var x = l*Math.sin(theta*Math.PI/180);
    var y = l*Math.cos(theta*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.fill();


    t += 0.08;
  }

  setInterval(oscillatePendulum, 50);


});
