const BalanceHistory = require('../../models/balanceHistory');

//Create
exports.addNewBalanceHistory = function (data) {
  return new Promise((resolve, reject) => {
    let newBalanceHistory = new BalanceHistory(data);
    newBalanceHistory.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`New Balance History (id: ${newBalanceHistory._id}) is created`);
      }
    });
  });
};

//Read All
exports.viewAllBalanceHistory = function () {
  return new Promise((resolve, reject) => {
    BalanceHistory.find()
    .populate({
      path: 'balances',
      populate: [{ path: 'services',
                   populate: 'serviceCategory' }]
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Read
exports.viewOneBalanceHistoryById = function (id) {
  return new Promise((resolve, reject) => {
    BalanceHistory.findOne({ _id: id })
    .populate({
      path: 'balances',
      populate: [{ path: 'services',
                   populate: 'serviceCategory' }]
    })
      .exec()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Update
exports.editBalanceHistoryById = function (data, id) {
  return new Promise((resolve, reject) => {
    BalanceHistory.updateOne({ _id: id }, { $set: data })
      .exec()
      .then(() => {
        resolve(`Balance History (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Delete
exports.deleteBalanceHistoryById = function (id) {
  return new Promise((resolve, reject) => {
    BalanceHistory.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`Balance History (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
