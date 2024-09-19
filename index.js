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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//freeCodeCamp challenge
app.get('/api/:time?', function(req, res){

  let date;
  const dateParam=req.params.time;
  
  if(!dateParam) {
    const currentTime=new Date();
    createTimeToResponse(currentTime, res);
    return;
  }

  const _tryParseNumber=Number(dateParam);
  const isNumberParam=!isNaN(_tryParseNumber);
  

  if(isNumberParam){
    const dateToNumber=Number(dateParam);
    date=new Date(dateToNumber);
  }else{
    date=new Date(dateParam);
  }

  if(isNaN(date.getTime())){
    res.json({
      error: "Invalid Date",
      unix: "",
      utc: ""
    })
  }

 createTimeToResponse(date, res);

});

function createTimeToResponse(date, res){
  const unixDate=date.getTime();
  const utcDate=date.toUTCString();
 
  if(!date || !unixDate) return;
 
  res.json({
   unix: unixDate,
   utc: utcDate
  });
}



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
