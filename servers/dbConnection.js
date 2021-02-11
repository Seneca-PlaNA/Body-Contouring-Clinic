const mongoose = require('mongoose');

const mongodbConnectionStr = process.env.MONGODB_URI;

module.exports = () => {
  function connect(){
    mongoose.connect(mongodbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
      if(err){
        console.error('mongodb connection error', err);
      }
      else{
        console.log('mongodb connected');
      }
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
}


