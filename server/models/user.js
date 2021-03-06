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
    minlength : 3

  },
  gender : {
    type : String,
    uppercase : true,

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
    default : 890,
    unique : false,


  },
  enrollmentno : {
    type : Number,

  },
  isteacher : {
    type : Boolean
  }

});

UserSchema.statics.findWhetherEnrollment = function(enrollmentno,rollno,email){
  var User = this;
console.log("inside mongo whether");
  console.log(email);
  console.log(enrollmentno);
  console.log(rollno);

    return User.findOne({$or:[{enrollmentno},{rollno},{email}]}).then((user)=>{

      if(!user){

        console.log("No such with provided criteria exists -DB");
        return Promise.reject();
      }
      else if (user) {
        console.log(user);
        return user;

      }



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
