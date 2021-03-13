const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = new Schema(
  {
    balanceAccount: {
      type: Number,
      required: true,
    },
/* 
    accountLevel: {
      type: Schema.Types.ObjectId,
      ref: 'accountLevels',
      required: true,
    }, */

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

    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Balance = mongoose.model('balances', balanceSchema);

module.exports = Balance;
