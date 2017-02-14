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



//Router
app.get('/',(req,res)=>{

});
app.post('/',(req,res)=>{
  var rcvdJson = req.body;
  console.log(rcvdJson);
  var user = new User(rcvdJson);


    from_email = new helper.Email("support@ProjectCentralpoint.com");
    to_email = new helper.Email(rcvdJson.email);
    subject = "Verify Your Account CentralPoint";
    content = new helper.Content("text/plain", "Please enter this activation code on the verification box");
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {

      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.header);
    });
    user.save().then(()=>{
    res.status(200).render('home.hbs',{
      userName : rcvdJson.name
    });

  }).catch((e)=>{
    res.render('four.hbs').status(400).send();
  })


});







server.listen(port,()=>{
  console.log(`UP on ${port}!!!`);
});
