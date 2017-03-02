$(document).ready(function(){


  $.getJSON("./../AFINN.json",function(data){
    console.log(data);
    var afinn = data;
    console.log(afinn.abandon + afinn.abducted);




    // var obj = {
    //
    //   "hello" : 9,
    //   "bye" : 22
    // }
    // kk =JSON.parse(JSON.stringify(obj));
    // console.log(kk);
    // console.log(typeof kk[0]);
    // console.log(isNaN(parseInt(kk[0])));
    // console.log(isNaN(Number(kk[1])));



var allWords

$('#feedbackTextAreaID').keyup(function (){



    allWords = $('#feedbackTextAreaID').val();
     //console.log(allWords);
       var words;
     words = allWords.split(/\W/);

    //  for(var i in obj){
    //    console.log(isNaN(obj[i]));
    //    console.log(Number(obj[i])+Number(obj[i+1]));
    //   //console.log('obj.' +i, '=',obj[i]);
    //  }


    var score = 0;


      for(var i  in words){//= 0;i<words.length;i++){
//console.log("value of i : " +i);
           var loweredwords = words[i].toLowerCase();
           console.log(loweredwords);
          if (afinn.hasOwnProperty(loweredwords)) {
              score += afinn[loweredwords];

          }
          console.log(score);
          document.getElementById('ScoreID').innerHTML = score;

    }



});

});


});
