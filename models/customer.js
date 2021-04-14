const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      required: true,
    },
    lastLoginTime: {
      type: Date,
      required: true,
    },
    balanceHistory: {
      type: Schema.Types.ObjectId,
      ref: 'balanceHistories',
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
