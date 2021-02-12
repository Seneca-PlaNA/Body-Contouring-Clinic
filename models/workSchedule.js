const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkScheduleSchema = new Schema({
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'staffs',
        required: true
    },
    dateId: {
        type: Schema.Types.ObjectId,
        ref: 'date',
        required: true
    },
    timeId: {
        type: Schema.Types.ObjectId,
        ref: 'time',
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true });

const WorkSchedule = mongoose.model('workSchedule', WorkScheduleSchema)

module.exports = WorkSchedule;