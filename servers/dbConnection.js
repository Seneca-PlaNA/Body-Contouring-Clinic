const mongoose = require('mongoose');
// const dbkey = require('../dbConnectionStr.json');

// const mongodbConnectionStr = process.env.MONGODB_URI;
const mongodbConnectionStr =
  'mongodb+srv://plana:Uvc1UKYcdzQJlQsG@cluster0.xwobk.mongodb.net/PlaNA?retryWrites=true&w=majority';

module.exports = () => {
  function connect() {
    mongoose.connect(
      mongodbConnectionStr,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err) {
        if (err) {
          console.error('mongodb connection error', err);
        } else {
          console.log('mongodb connected');
        }
      }
    );
  }
  connect();
  mongoose.connection.on('disconnected', connect);
};
