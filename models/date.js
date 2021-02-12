const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSchema = new Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'appointment',
        required: true
    },
    sceduleId: {
        type: Schema.Types.ObjectId,
        ref: 'workSchedule',
        required: true
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Date = mongoose.model('date', DateSchema);

module.exports = Date;