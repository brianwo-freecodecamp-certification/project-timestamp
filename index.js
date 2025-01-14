// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// get date
// returns `unix time epoch and utc formatted date
app.get("/api/:date?", function (req, res) {
  const param = req.params.date;
  var date = new Date(param === undefined ? Date.now() : param);

  if (isNaN(date.getDate())) {
    date.setTime(param);
  }

  if (!isNaN(date.getDate())) {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
    return;
  }

  res.json({error: "Invalid Date"});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
