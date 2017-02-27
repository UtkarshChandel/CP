const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const firebase = require('firebase');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const hbs = require('hbs');
const jQuery = require('jquery');
var admin = require('firebase-admin');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
var dotenv = require('dotenv');
dotenv.load();

var config = {
apiKey: "AIzaSyDWbOM-S0cUTsd2-BIMZ4gMb1emqm5Pf88",
authDomain: "project-cp-def29.firebaseapp.com",
databaseURL: "https://project-cp-def29.firebaseio.com",
storageBucket: "project-cp-def29.appspot.com",
messagingSenderId: "651436094861"
};
firebase.initializeApp(config);


var serviceAccount = require("./project-cp-def29-firebase-adminsdk-zhxkc-15c6781de4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-cp-def29.firebaseio.com"
});



//===INItialize firebase===================

//====
app.use(bodyParser.urlencoded({ extended: false }))


//============================================================================//

// parse application/json
app.use(bodyParser.json())
//My Middleware
app.use(express.static(__dirname +'./../public'));
app.set('view engine',hbs);
//===========================================================================//

app.post('/profile',(req,res)=>{


  var accessToken = req.body.token

  var ak = JSON.parse(accessToken);
  // console.log('ttookkeen');
  // console.log(ak.accessToken);

  admin.auth().verifyIdToken(ak.accessToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      var mailid = decodedToken.email;
      var isVerified = decodedToken.email_verified;
      global.c = mailid;
      console.log('mail id idhar hai jo send ho rha hai!!');
      console.log(mailid);

      if (isVerified) {
        User.findWhetherEnrollment("","",mailid).then((user)=>{
          console.log("This is second run");
          res.render('secondRun.hbs');
        }).catch((e)=>{
          res.render('profile.hbs')
        });
      }


      // if(isVerified){
      //   console.log("Success");
      //   res.render('profile.hbs',{
      //
      //   });
      // }
      else {
        res.status(400).render('four.hbs');
      }

      // ...
    }).catch(function(error) {
      res.render('four.hbs');
      console.log('ERRRR');
      console.log(error);

      // Handle error
    });

});

app.post('/personal',(req,res)=>{
  var recvdata = req.body;
  console.log(recvdata);
  var user = new User(recvdata);

  user.save().then(()=>{
    console.log('Saved');
    res.render('secondRun.hbs');
  }).catch((e)=>{
    res.status(400).send();
    console.log(e);
  })


});

app.post('/check',(req,res)=>{
  var body = _.pick(req.body,['enrollmentno','rollno']);
  console.log(body);
  //var body2roll = _.pick(req.body,['rollno'])
//body.enrollmentno,
    User.findWhetherEnrollment(body.enrollmentno,body.rollno).then((user)=>{
      console.log("user exists ");
      res.send("alreadyexists");
  }).catch((e)=>{
      res.send("allgood");
  });


});

io.on('connection',(socket)=>{
  if (!global.c) {

    global.c = "No User";

  }
  console.log(`${global.c}  connected`);
});








server.listen(port,'0.0.0.0',()=>{
  console.log(`UP on ${port}!!!`);
});
