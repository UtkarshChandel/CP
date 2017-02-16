const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const hbs = require('hbs');
const jQuery = require('jquery');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
var dotenv = require('dotenv');
dotenv.load();

var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;

//====
app.use(bodyParser.urlencoded({ extended: false }))
var helper = require('sendgrid').mail;
var sendgrid = require('sendgrid')('Utkarshchandel',process.env.SENDGRID_API_KEY);
//====

// parse application/json
app.use(bodyParser.json())
//My Middleware
app.use(express.static(__dirname +'./../public'));
app.set('view engine',hbs);

io.on('connection',(socket)=>{
  console.log('New user connected');
});


var checkSuc = true;
//Router
app.get('/',(req,res)=>{

});
app.post('/',(req,res)=>{
  var rcvdJson = req.body;
  console.log(rcvdJson);
  var user = new User(rcvdJson);
  mmail();



  function mmail(){

    from_email = new helper.Email("CentralPoint@ProjectCentralpoint.com");
    to_email = new helper.Email(rcvdJson.email);
    subject = "Verify Your Account";
    content = new helper.Content("text/plain", "Please enter this activation code on the verification box");
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGdRID_API_KEY);
      var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });


    sg.API(request).then((request)=>{
        console.log(response.statusCode);

        console.log(response.body);
        console.log(response.header);
        console.log("here in response");
        if(response.statusCode != 201){
          checkSuc = false;
          console.log('in if');
          console.log(checkSuc);
        }
      }).catch((error)=>{
        console.log(error.message);
        console.log('error occured');
      });



  }

  var ifItWorks = new Promise(
    function (resolve,reject){
      if(checkSuc){
        resolve(checkSuc);
        console.log('resolved');
      }else {
        var reason = new Error('mail not sent');
        reject(reason);
      }
    }
  );


 function consume(){
   setTimeout(function(){
    ifItWorks
    .then(()=>{
      console.log(checkSuc);
      user.save();
      console.log('saved doc.');
      res.status(200).render('home.hbs',{
        userName : rcvdJson.name
      })

    })
    .catch((error)=>{

      console.log(error.message);
      res.render('four.hbs').status(400).send();
    });
  },1000);
};

consume();
});


app.post('/login',(req,res)=>{

})







server.listen(port,()=>{
  console.log(`UP on ${port}!!!`);
});
