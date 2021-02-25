const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
    serviceCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'serviceCategories',
    },
    requestCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'requestCategories',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    lastRequestTime: {
      type: Date,
      required: true,
    },
    attachedFile: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
