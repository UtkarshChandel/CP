jQuery.validator.addMethod("myFunc", function(val) {
    if(val=='CM' || val == 'cm'){
      return true;
    }
    return false;
  }, "Currently Available for CM only #Burn");

$().ready(function() {
  $("#message-form").validate({
    rules : {
      name : {
        required : true

      },
      email : {

          required : true,
          email : true
      },
      password : {
        required : true,
        minlength : 8
      },
      course : {
        required : true,
            myFunc : true
    }
  },
    messages : {
      name : {
          required : "enter the name"
      },
      password : {
        required : "Please provide the password",
        minlength : "Your password must be atleast 8 characters long"
      },
      email : {
        required : "Please provide an Email",
        email : "Please enter a valid Email"
      },
      course : {

        required : "Please provide course code"

      }
    }

  });

});
