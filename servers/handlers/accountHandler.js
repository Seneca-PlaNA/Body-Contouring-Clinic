const Account = require('../../models/account');
const BalanceHistory = require('../../models/balanceHistory');
const Customer = require('../../models/customer');
const mongoose = require('mongoose');

//Create

exports.addNewAccount = function async (data) {
    return new Promise((resolve, reject)=> {

    let balance = new BalanceHistory({
      _id: new mongoose.Types.ObjectId(),
      currentBalance: 0,
    });
    balance.save();
    var balanceH = `${balance._id}`;
    data.balanceHistory = balanceH;
    // try{

    // const userNameValidation =  Account.findOne({ userID: data.userID }).exec();
    // if(userNameValidation) {
    //   console.log(userNameValidation)
    //     throw Error(`Username ${data.userID} has been taken. Please try another username.`);
    // }

    // const emailValidation = Account.findOne({ email: data.email }).exec()
    // if(emailValidation) {
    //   console.log(emailValidation)
    //   throw Error(`Email ${data.email} has been taken. Please try another username.`);
    // }

    let newAccount = new Account(data);
    newAccount.save().then((data) => {
      let newCustomer = new Customer({
        account: data._id,
        lastLoginTime: new Date(),
        balanceHistory: data.balanceHistory,
      });
      newCustomer
        .save()
        .then((data) => {
          resolve({success: true, data})
          // return {success: true, data};
        })
        .catch((err) => {
          return {success: false, data: err, message: err.message};
        });
    });
    // } catch(e){
    //   console.error('Fail to create a new account');
    //   // return {sucess: false, message: e.message};
    //   reject({sucess: false, message: e.message})
    // }
    })


}
//Read All
exports.viewAllAccount = function () {
  return new Promise((resolve, reject) => {
    Account.find()
      .populate('accountLevelId')
      .populate({
        path: 'balanceHistory',
        populate: [
          {
            path: 'balances',
            populate: [{ path: 'services', populate: { path: 'serviceCategory' } }],
          },
        ],
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

//Read
exports.viewOneAccountById = function (id) {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: id })
      .populate('accountLevelId')
      .populate({
        path: 'balanceHistory',
        populate: [
          {
            path: 'balances',
            populate: [{ path: 'services', populate: { path: 'serviceCategory' } }],
          },
        ],
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
exports.editAccountById = function (data, id) {
  return new Promise((resolve, reject) => {
    Account.updateOne({ _id: id }, { $set: data })
      .exec()
      .then(() => {
        resolve(`Account (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Delete
exports.deleteAccountById = function (id) {
  return new Promise((resolve, reject) => {
    Account.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`Account (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Read
exports.viewOneAccountByInput = function (query) {
  return new Promise((resolve, reject) => {
    Account.findOne(query)
      .populate('accountLevelId')
      // .populate({
      //   path: 'balanceHistory',
      //   populate: [
      //     {
      //       path: 'balances',
      //       populate: [{ path: 'services', populate: { path: 'serviceCategory' } }],
      //     },
      //   ],
      // })
      .exec()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
