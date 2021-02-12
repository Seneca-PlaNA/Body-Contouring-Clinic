const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'appointmnt',
        required: true
    },
    sceduleId: {
        type: Schema.Types.ObjectId,
        ref: 'workSchedule',
        required: true
    },
    time: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Time = mongoose.model('time', TimeSchema);

module.exports = Time;