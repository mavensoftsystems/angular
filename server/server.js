var express = require('express');
var fs = require("fs");
var bodyParser     = require('body-parser');
const JSON = require('circular-json');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
   extended: true
 }));
 app.use(bodyParser.json());



app.get('/listUsers', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of mi

   fs.readFile("../flights.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/book', function(req, res) {
   console.log("data"+JSON.stringify(req.body));
   fs.readFile('../book.json',function(err,content){
      if(err) throw err;
      var parseJson = JSON.parse(content);
      const json = req.body;
       parseJson.data.push(json);
      
      fs.writeFile('../book.json',JSON.stringify(parseJson),function(err){
        if(err) throw err;
        res.send(json);
      })
    })

 })

 app.get('/journeyHistory', function (req, res) {

  fs.readFile("../book.json", 'utf8', function (err, data) {
     console.log( "data "+data);
     res.end( data );
  });
})

var server = app.listen(8090, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})