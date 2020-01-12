const http = require('http');
const express = require('express');
const app = express();
const port = 4000;

// Telling the server to use the JSON bodyparser module when handling post requests
app.use(express.json());

// Allowing cross-origin requests to your api url
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serving the home page when the request is '/'
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Receiving a post request from '/postreq'. Parsing the JSON body and inserting into the database.
app.post('/postreq', function (req, res) {
   console.log(req.body);
   res.send("got it");
});

// Listening on port 4000
app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});