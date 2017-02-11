const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const hbs = require('hbs');
const jQuery = require('jquery');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
var helper = require('sendgrid').mail;

// parse application/json
app.use(bodyParser.json())
//My Middleware
app.use(express.static(__dirname +'./../public'));
app.set('view engine',hbs);
//Router
app.get('/',(req,res)=>{

});
app.post('/',(req,res)=>{
  var rcvdJson = req.body;
  console.log(rcvdJson);
  var user = new User(rcvdJson);

  user.save().then(()=>{
    from_email = new helper.Email("support@ProjectCentralpoint.com");
    to_email = new helper.Email(rcvdJson.email);
    subject = "Verify Your Account CentralPoint";
    content = new helper.Content("text/plain", "Please enter this activation code on the verification box");
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')('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');
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
    res.status(200).render('home.hbs',{
      userName : rcvdJson.name
    });

  }).catch((e)=>{
    res.status(400).send(e);
  })


});

app.get('/mail',(req,res)=>{
  // using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



});







app.listen(port,()=>{
  console.log(`UP on ${port}!!!`);
});
