var $ = require('jquery');
var jv = require('jquery-validation');

$('message-form').submit((e)=>{
var userEmail = $('#email').val();
var userName = $('#name').val();
var userPassword = $('#password').val();
var userCourse = $('#course').val();
var userYear = $('#year').val();
var userRollno = $('#rollno').val();
  event.preventDefault();
  console.log("Event called");


  $.ajax({
    url : '/',
    type : 'POST',
    data : {
          email: userEmail,
          name : userName,
          password : userPassword,
          course : userCourse,
          year : userYear,
          rollno : userRollno
    },
    success : function (response) {
        console.log(response);
    }
  });

});
