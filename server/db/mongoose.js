var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //(Simply telling mongoose which promise library to use here global is a standard mongoose lib. So rather than using a third party lib we are using this one)
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/CP');


module.exports = {mongoose};
