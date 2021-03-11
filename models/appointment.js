const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    contactNumber: {
        type: String,
        required: true
    },
    specialRequest: {
        type: String,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'workSchedules',
        required: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'services',
      required: true
    },
    confirmation: {
      type: Boolean,
    }  

}, { timestamps: true });

const Appointment = mongoose.model('appointments', AppointmentSchema);

module.exports = Appointment;
