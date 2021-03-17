const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: 'services',
      },
    ],
    price:{
      type: Number,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model('offers', offerSchema);

module.exports = Offer;
