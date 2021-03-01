const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'services',
      required: true,
    },

    balanceAccount: {
      type: Number,
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
