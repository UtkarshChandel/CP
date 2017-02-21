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
var helper = require('sendgrid').mail;

//============================================================================//

// parse application/json
app.use(bodyParser.json())
//My Middleware
app.use(express.static(__dirname +'./../public'));
app.set('view engine',hbs);
//===========================================================================//
app.post('/',(req,res)=>{


})

io.on('connection',(socket)=>{
  console.log('New user connected');
});








server.listen(port,()=>{
  console.log(`UP on ${port}!!!`);
});
