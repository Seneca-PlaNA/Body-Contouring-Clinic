const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmntSchema = new Schema({
    contactNumber: {
        type: String,
        required: true
    },
    specialRequest: {
        type: String,
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    scheduleId: {
        type: Schema.Types.ObjectId,
        ref: 'workSchedule',
        required: true
    } 

}, { timestamps: true });

const Appointmnt = mongoose.model('appointmnt', AppointmntSchema);

module.exports = Appointmnt;