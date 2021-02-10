const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const Account = require('../models/account');

/**
 *      IMPORTANT!!!!
 *  please remove the connection string EVERYTIME you push the code to git
 *          EVERYTIME!!!! don't be lazy, don't expose our credential
 */
const mongodbConnectionStr =
  '';
mongoose
  .connect(mongodbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => {
      console.log(`express is running on ${port}`);
    })
  )
  .catch((err) => console.log(err));

// hard-coded add new account
app.get('/add-account', (req, res) => {
  const account = new Account({
    firstName: 'Yuan',
    lastName: 'Lee',
    userID: '6647lee',
    password: '!pass',
    email: 'ihavesixchildren@protonmail.ch'
  });
  account.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

app.use(cors());
app.use(bodyParser.json());

app.use('/api', (req, res) => res.json({ backServer: 'true' }));
