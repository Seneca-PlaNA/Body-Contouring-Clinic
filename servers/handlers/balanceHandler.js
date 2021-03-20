const Balance = require('../../models/balance');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create
exports.addNewBalance = function (data) {
  return new Promise((resolve, reject) => {
    let _balance = new Balance({
      _id: new mongoose.Types.ObjectId(),
      balanceAccount: new Number,
      services: new Schema.Types.ObjectId(),
      date: new Date,
      isActive: new Boolean,
    });
    console.log(_balance);
    _balance.save();
    console.log(_balance);
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
      .populate({
        path: 'services',
        populate: [{ path: 'serviceCategory'}]
      })
   /* .populate('accountLevel') */
      .exec()
      .then((balances) => {
        resolve(balances);
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
    .populate({
      path: 'services',
      populate: [{ path: 'serviceCategory'}]
    })
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
