const firebase = require('firebase');

var config = {
   apiKey: "AIzaSyDWbOM-S0cUTsd2-BIMZ4gMb1emqm5Pf88",
   authDomain: "project-cp-def29.firebaseapp.com",
   databaseURL: "https://project-cp-def29.firebaseio.com",
   storageBucket: "project-cp-def29.appspot.com",
   messagingSenderId: "651436094861"
 };
 firebase.initializeApp(config);
var firebaseRef = firebase.database().ref();
 firebaseRef.set({
  app :{
    name : 'CP',
    version : '1.0.0'
  },
   isRunning : true,
   user : {
     name : 'Utkarsh',
     age : 19
   }
 });
