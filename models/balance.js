const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = new Schema(
  {
    account:{
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      required: true,
    },

    balanceAccount: {
      type: Number,
      required: true,
    },

    accountLevel: {
      type: Schema.Types.ObjectId,
      ref: 'accountLevels',
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Balance = mongoose.model('balances', balanceSchema);

module.exports = Balance;
