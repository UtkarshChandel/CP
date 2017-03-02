const mongoose = require('mongoose');


var ReviewSchema = new mongoose.Schema({

  review : {
    type : String,

  },
  score : {
    type : Number
  }

});












var Review = mongoose.model('Review',ReviewSchema);

module.exports = {Review};
