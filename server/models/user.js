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
  },
  course : {
    type : String,
    required : true
    },
  rollno : {
    type : Number,
    min : 1,
    max : 79
  },
  enrollmentno : {
    type : Number,
    
  }

});





var User = mongoose.model('User',UserSchema);

module.exports = {User};
