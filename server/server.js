
var express = require('express');
var app = express();
var path = require('path');
// var bodyParser = require('body-parser');
// console.log(app);

var port = process.env.PORT || 6660;

//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

app.get('/', function(req, res) {
  console.log('request for index');
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});



// Listen //
app.listen(port, function(){
   console.log('thx for listening on channel:', port);
});
