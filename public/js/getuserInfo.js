$(document).ready(function(){


  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      window.email = user.email



    }else {
      window.email = ""
    }


    $.ajax({ //=====This is to fetch name and username from DB and display it at the app Drawer title======
        url : '/userINFO',
        type : 'POST',
        data : {
          reqMail : window.email
        },
        success : function(response){
          console.log("res");

          console.log(response);
          document.getElementById('titleofdrawer').innerHTML = response.name;
          document.getElementById('emaillabelUNDER').innerHTML = response.email;
        }



    });






  });






});
