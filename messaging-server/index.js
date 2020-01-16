const http = require('http');
const express = require('express');
var cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');
const app = express();


  // Telling the server to use the JSON bodyparser module when handling post requests
  app.use(cors());
  app.use(express.json());

  // Allowing cross-origin requests to your api url
  app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

  const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:910ff836-aaa7-4664-9c67-07fbadf8e57c",
    key: "aa7d5982-1d27-463b-b704-9777f579b2cc:TkD59v5QK0UUS7ffO4bAlYom1jqeJLN02xm+vKCFTO8=",
  })

  // Serving the home page when the request is '/'
  app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
  });

  // Receiving a post request from '/postreq'. Parsing the JSON body and inserting into the database.
  app.post('/postreq', function (req, res) {
     console.log("this is req", req.body);
     res.send("got it");
     console.log(typeof(req.body));
     var reqObj = req.body;

     chatkit.createUser({
        id: reqObj.uid,
        name: reqObj.userName,
     })
    .then(() => {
      console.log('User created successfully');
      return null;
    }).catch((err) => {
      console.log(err);
    });
  });

 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //console.log(Our app is running on port ${ PORT });
});