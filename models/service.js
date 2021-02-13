const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  // _id: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  // },
  serviceCategory: {
    type: Schema.Types.ObjectId,
    ref: 'serviceCategories',
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Service = mongoose.model('services', serviceSchema);

module.exports = Service;
