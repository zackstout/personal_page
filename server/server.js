
var express = require('express');
var app = express();


var port = process.env.PORT || 5454;

// Serve back static files
app.use(express.static('./server/public'));


// Listen //
app.listen(port, function(){
   console.log('thx for listening on channel:', port);
});
