// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function (request, response) {
  var params = request.params[0];
  var timestamp = params.split('/')[1];
  var date = new Date();
  var jsonObj = {
    "unix": null,
    "natural": null
  }
  
  if (/^\d*$/.test(timestamp)) {
    date.setTime(timestamp);
  } else {
    date = new Date(timestamp);
  }
  
  if (!date.getTime()) {
    response.send("error with given date");
  } else {
    response.send({
      unix: date.getTime(),
      natural: moment.unix(date.getTime()).format("MMMM D, YYYY")
    });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
