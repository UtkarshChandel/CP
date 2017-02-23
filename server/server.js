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
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
var dotenv = require('dotenv');
dotenv.load();


//====
app.use(bodyParser.urlencoded({ extended: false }))


//============================================================================//

// parse application/json
app.use(bodyParser.json())
//My Middleware
app.use(express.static(__dirname +'./../public'));
app.set('view engine',hbs);
//===========================================================================//

app.post('/utk',(req,res)=>{
    console.log(req.body);
    global.c = req.body.email;
    res.render('profile.hbs');

});

io.on('connection',(socket)=>{
  if (!global.c) {

    global.c = "No User";

  }
  console.log(`${global.c}  connected`);
});








server.listen(port,()=>{
  console.log(`UP on ${port}!!!`);
});
