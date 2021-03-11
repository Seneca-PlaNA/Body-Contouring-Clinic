const Balance = require('../../models/balance');

//Create
exports.addNewBalance = function (data) {
  return new Promise((resolve, reject) => {
    let newBalance = new Balance(data);
    newBalance.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`New Balance (id: ${newBalance._id}) is created`);
      }
    });
  });
};

//Read All
exports.viewAllBalance = function () {
  return new Promise((resolve, reject) => {
    Balance.find()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b9de48a7345ce0aa402e365e805fba3673fe9465
      .populate('account')
      .populate('accountLevel')
      .then((balances) => {
        resolve(balances);
<<<<<<< HEAD
=======
    .populate({
      path: 'balanceHistory',
      populate: { path: 'date'},
    })
    .populate({
      path: 'service',
      populate: [{ path: 'serviceCategory'}, { path: 'name' }],
    })
    .populate({
      path: 'accountLevel',
      populate: { path: 'name'},
    })
    .populate({
      path: 'customer',
      populate: { path: 'account' },
    })
    .exec()
      .then((balance) => {
        resolve(balance);
>>>>>>> c3c439d (balance(need to fix))
=======
>>>>>>> b9de48a7345ce0aa402e365e805fba3673fe9465
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Read
exports.viewOneBalanceById = function (id) {
  return new Promise((resolve, reject) => {
    Balance.findOne({ _id: id })
<<<<<<< HEAD
<<<<<<< HEAD
      .populate('account')
      .populate('accountLevel')
=======
    .populate({
      path: 'balanceHistory',
      populate: { path: 'date'},
    })
    .populate({
      path: 'service',
      populate: [{ path: 'serviceCategory'}, { path: 'name' }],
    })
    .populate({
      path: 'accountLevel',
      populate: { path: 'name'},
    })
    .populate({
      path: 'customer',
      populate: { path: 'account' },
    })
>>>>>>> c3c439d (balance(need to fix))
=======
      .populate('account')
      .populate('accountLevel')
>>>>>>> b9de48a7345ce0aa402e365e805fba3673fe9465
      .exec()
      .then((balance) => {
        resolve(balance);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Update
exports.editBalanceById = function (data, id) {
  return new Promise((resolve, reject) => {
    Balance.updateOne({ _id: id }, { $set: data })
      .exec()
      .then(() => {
        resolve(`Balance (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Delete
exports.deleteBalanceById = function (id) {
  return new Promise((resolve, reject) => {
    Balance.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`Balance (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
