const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceHistorySchema = new Schema(
  {
    balances: [
      {
        type: Schema.Types.ObjectId,
        ref: 'balances',
        required: true,
      },
    ],

    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'services',
        required: true,
      },
    ],

    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const BalanceHistory = mongoose.model('balanceHistories', balanceHistorySchema);

module.exports = BalanceHistory;
