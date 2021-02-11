const mongoose = require('mongoose');

/**
 *      IMPORTANT!!!!
 *  please remove the connection string EVERYTIME you push the code to git
 *          EVERYTIME!!!! don't be lazy, don't expose our credential
 */
const mongodbConnectionStr = 'mongodb+srv://plana:Uvc1UKYcdzQJlQsG@cluster0.xwobk.mongodb.net/PlaNA?retryWrites=true&w=majority';

mongoose.connect(mongodbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true })



