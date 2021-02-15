const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbConnection');
const Account = require('../models/account');
const mongoose = require('mongoose');
const serviceCategoryHandler = require('./handlers/serviceCategoryHandler');
const serviceHandler = require('./handlers/serviceHandler');
const requestCategoryHandler = require('./handlers/requestCategoryHandler');
const pageHandler = require('./handlers/pageHandler');
const offerHandler = require('./handlers/offerHandler');

app.use(cors());
app.use(bodyParser.json());
db();

mongoose.set('useFindAndModify', false);

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
app.post('/create-service-category', (req, res) => {
  serviceCategoryHandler.addNewServiceCategory(req.body).then((msg) => res.json(msg));
});

app.get('/service-categories', (req, res) => {
  serviceCategoryHandler
    .viewAllServiceCategories()
    .then((serviceCategories) => res.json(serviceCategories))
    .catch((err) => res.json(err));
});

app.get('/service-category/:id', (req, res) => {
  serviceCategoryHandler
    .viewServiceCategoryById(req.params.id)
    .then((serviceCategory) => res.json(serviceCategory))
    .catch((err) => res.json(err));
});

app.put('/service-category/:id', (req, res) => {
  serviceCategoryHandler
    .editServiceCategoryById(req.body, req.params.id)
    .then((msg) => res.json(msg))
    .catch((err) => res.json(err));
});

app.delete('/service-category/:id', (req, res) => {
  serviceCategoryHandler
    .deleteServiceCategoryById(req.params.id)
    .then((serviceCategory) => res.json(serviceCategory))
    .catch((err) => res.json(err));
});

// service
app.post('/add-service', (req, res) => {
  serviceHandler.addNewService(req.body).then((msg) => res.json(msg));
});

app.get('/services', (req, res) => {
  serviceHandler
    .viewAllServices()
    .then((services) => res.json(services))
    .catch((err) => res.json(err));
});

app.get('/service/:id', (req, res) => {
  serviceHandler
    .viewOneServiceById(req.params.id)
    .then((service) => res.json(service))
    .catch((err) => res.json(err));
});

app.put('/service/:id', (req, res) => {
  serviceHandler
    .editServiceById(req.body, req.params.id)
    .then((msg) => res.json(msg))
    .catch((err) => res.json(err));
});

app.delete('/service/:id', (req, res) => {
  serviceHandler
    .deleteServiceById(req.params.id)
    .then((service) => res.json(service))
    .catch((err) => res.json(err));
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

// page
app.post('/add-page', (req, res) => {
  pageHandler.addNewPage(req.body).then((msg) => res.json(msg));
});

app.get('/pages', (req, res) => {
  pageHandler
    .viewAllPages()
    .then((pages) => res.json(pages))
    .catch((err) => res.json(err));
});

app.get('/page/:id', (req, res) => {
  pageHandler
    .viewOnePageById(req.params.id)
    .then((page) => res.json(page))
    .catch((err) => res.json(err));
});

app.put('/page/:id', (req, res) => {
  pageHandler
    .editPageById(req.body, req.params.id)
    .then((msg) => res.json(msg))
    .catch((err) => res.json(err));
});

app.delete('/page/:id', (req, res) => {
  pageHandler
    .deletePageById(req.params.id)
    .then((page) => res.json(page))
    .catch((err) => res.json(err));
});

// offer
app.post('/add-offer', (req, res) => {
  offerHandler.addNewOffer(req.body).then((msg) => res.json(msg));
});

app.get('/offers', (req, res) => {
  offerHandler
    .viewAllOffers()
    .then((offers) => res.json(offers))
    .catch((err) => res.json(err));
});

app.get('/offer/:id', (req, res) => {
  offerHandler
    .viewOneOfferById(req.params.id)
    .then((offer) => res.json(offer))
    .catch((err) => res.json(err));
});

app.put('/offer/:id', (req, res) => {
  offerHandler
    .editOfferById(req.body, req.params.id)
    .then((msg) => res.json(msg))
    .catch((err) => res.json(err));
});

app.delete('/offer/:id', (req, res) => {
  offerHandler
    .deleteOfferById(req.params.id)
    .then((offer) => res.json(offer))
    .catch((err) => res.json(err));
});

app.use('/api', (req, res) => res.json({ backServer: 'true' }));

app.listen(port, () => {
  console.log('Express http server listening on: ' + port);
});
