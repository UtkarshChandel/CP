const mongoose = require('mongoose');


var TeacherSchema = new mongoose.Schema({

  email : {
    type : String,
    lowercase : true,
    unique : true
  }

});

TeacherSchema.statics.findWheatherTeacher = function(email){
  var Teacher = this;

  return Teacher.findOne({email}).then((teacher)=>{
    if(!teacher){
      console.log("No teacher exist with this email!! ");
      return Promise.reject();
    }
      return teacher;
  })


}


var Teacher = mongoose.model('Teacher',TeacherSchema);

module.exports = {Teacher};
