const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const Account = require('../models/account');;

app.use(cors());
app.use(bodyParser.json());


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
});

app.get('/accounts', (req, res) => {
  Account.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/account/:id', (req, res) => {
  Account.findById(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});


app.use('/api', (req, res) => res.json({ backServer: 'true' }));


app.listen(port, ()=>{
  console.log("Express http server listening on: " + port);
});
