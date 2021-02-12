const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    dayOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    accountLevel: {
      type: Schema.Types.ObjectId,
      ref: 'accountLevel',
      required: true,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('accounts', accountSchema);

module.exports = Account;
