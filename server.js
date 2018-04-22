// Timestamp microservice

// Takes a given natural or unix time, and returns a JSON object
// that has both the natural and unix time in it.
var express = require('express');
var moment = require('moment');
var app = express();

app.use(express.static('public'));

app.get("*", function(request, response) {
    var params = request.params[0];
    var timestamp = params.split('/')[1];
    var jsonObj = {
        "unix": null,
        "natural": null
    }

    // Check to see if the date recieved is a unix timestamp, or something else.
    // Then process based on that.
    if (/^\d{10}$/.test(timestamp)) {
        jsonObj.unix = timestamp;
        jsonObj.natural = moment.unix(timestamp).format("MMMM DD, YYYY");
        response.json(jsonObj);
    } else if (/^.{3,9}\s\d{1,2},\s\d{4}$/.test(timestamp)) {
        jsonObj.natural = timestamp;
        jsonObj.unix = moment(timestamp, "MMMM DD, YYYY").unix();
        response.json(jsonObj);
    } else {
        response.send("Invalid time data");
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('The microservice is listening on port ' + listener.address().port);
});
