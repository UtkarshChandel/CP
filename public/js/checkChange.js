$(document).ready(function(){


    $.ajax({
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






    $('#enrollmentid').change(function () {
      //console.log(document.getElementById('enrollmentid').value);

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
