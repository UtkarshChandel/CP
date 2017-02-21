var $ = require('jquery');

//Button event//
btnGit.addEventListener('click',e =>{

});


  $.ajax({
    url : '/',
    type : 'POST',
    data : {
          email: userEmail,
          password : userPassword
    },
    success : function (response) {
        console.log(response);
    }
  });

});
