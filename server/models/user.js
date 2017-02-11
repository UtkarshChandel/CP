const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim : true,
    minlength : 3,

  },
  email : {
    type : String,
    lowercase : true,
    required : true,
    trim : true,
    unique : true,
    validate : {
      validator : validator.isEmail,
      message : "{VALUE} is not a valid Email"
    }
  },
  password : {
    type : String,
    required : true,
    minlength : 8
  },
  course : {
    type : String,
    required : true
    },
  year : {
    type : Number,
    min : 2016,
    max : 2017

  },
  rollno : {
    type : Number,
    min : 1,
    max : 79
  }

});





var User = mongoose.model('User',UserSchema);

module.exports = {User};
