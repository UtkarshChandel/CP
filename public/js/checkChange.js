$(document).ready(function(){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.email = user.email
      console.log("checking here");
      console.log(window.email);


    }else {
      window.email = ""
    }

    $.ajax({                    //====This is To chck whether the emailID is of a Teacher====
      url : '/isTeach',
      type : 'POST',
      data : {
        email : window.email
      },
      success : function(response){

        if(response == "isTeacher"){
          console.log("This is a teacher");
          $('#rollnoid').hide(1000);
          $('#rollnoLabel').hide(1000);
          document.getElementById('enrollLabel').innerHTML = '';
          document.getElementById('enrollLabel').innerHTML = 'Unique ID';
          $('#profilesubBTN').css("background-color","#0275d8");
          document.getElementById('profilesubBTN').addEventListener('click',TeacherSubmission,false);





        }else {
          document.getElementById('profilesubBTN').addEventListener('click',Submission,false);

        }
      }
    });





    $.ajax({   //===This is to prevent loop creation of profile form data to chck whether the user exists in DB already====
      url : '/check',
      type : 'POST',
      data : {

        email : window.email
      },
      success : function(response){

        if (response == "alreadyexists") {
            document.getElementById('err').innerHTML = 'Sorry User already Exists';
            $('.error').fadeIn(400).delay(3000).fadeOut(400);
            location.reload();

      }

    }
  });




});



    $('#rollnoid').change(function(){
      console.log('roll going');

        $.ajax({
          url : '/check',
          type : 'POST',

          data : {
            rollno : document.getElementById('rollnoid').value


          },
          success : function(response){

            if (response == "alreadyexists") {
                document.getElementById('err').innerHTML = 'Sorry User already Exists';
                $('.error').fadeIn(400).delay(3000).fadeOut(400);
                $('#rollnoid').val('');

          }

        }

    });
  });






    $('#enrollmentid').keyup(function () {
      console.log(document.getElementById('enrollmentid').value);

      $.ajax({
        url : '/check',
        type : 'POST',

        data : {
          enrollmentno : document.getElementById('enrollmentid').value
        },
        success : function(response) {
        if (response == "alreadyexists") {
            document.getElementById('err').innerHTML = 'Sorry User already Exists';
            $('.error').fadeIn(400).delay(3000).fadeOut(400);
            $('#enrollmentid').val('');
            //console.log('passed removal')
        }


        }
      });




    });


});
