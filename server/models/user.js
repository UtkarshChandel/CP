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

UserSchema.statics.findWhetherEnrollment = function(enrollmentno,rollno){
  var User = this;
  console.log("inside mongo whether");
    return User.findOne({$or:[{enrollmentno},{rollno}]}).then((user)=>{
      if(!user){
        console.log("no user");
        return Promise.reject()
      }

      return user;

    })
}
//{$or:[{enrollmentno},{rollno}]}

// UserSchema.statics.findWhetherRollno = function(rollno){
//   var User = this;
//
//     return User.findOne({rollno}).then((user)=>{
//       if(!user){
//         return Promise.reject()
//       }
//
//       return user;
//
//     })
// }






var User = mongoose.model('User',UserSchema);

module.exports = {User};
