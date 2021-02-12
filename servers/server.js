const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbConnection');
const Account = require('../models/account');
const serviceCategoryHandler = require('./handlers/serviceCategoryHandler');
const serviceHandler = require('./handlers/serviceHandler');
const requestCategoryHandler = require('./handlers/requestCategoryHandler');

app.use(cors());
app.use(bodyParser.json());
db();

// DB API
// account
app.get('/add-account', (req, res) => {
  const account = new Account({
    firstName: 'Yuan',
    lastName: 'Lee',
    userID: '6647lee',
    password: '!pass',
    email: 'ihavesixchildren@protonmail.ch',
  });
  account
    .save()
    .then((result) => {
      res.send(result);
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
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// service-category
app.get('/add-service-category', (req, res) => {
  serviceCategoryHandler.addNewServiceCategory(res);
});

app.get('/service-categories', (req, res) => {
  serviceCategoryHandler.viewAllServiceCategory(res);
});

app.get('/service-category/:id', (req, res) => {
  serviceCategoryHandler.viewOneServiceCategory(req, res);
});

// service
app.get('/add-service', (req, res) => {
  serviceHandler.addNewService(res);
});

app.get('/services', (req, res) => {
  serviceHandler.viewAllServices(res);
});

app.get('/service/:id', (req, res) => {
  serviceHandler.viewOneService(req, res);
});

// requestCategory
app.get('/add-requestCategory', (req, res) => {
  requestCategoryHandler.addNewRequestCategory(res);
});

app.get('/request-categories', (req, res) => {
  requestCategoryHandler.viewAllRequestCategories(res);
});

app.get('/edit-requestCategory', (req, res) => {
  requestCategoryHandler.editRequestCategory(res);
});

app.use('/api', (req, res) => res.json({ backServer: 'true' }));

app.listen(port, () => {
  console.log('Express http server listening on: ' + port);
});
