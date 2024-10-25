// models/logModel.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', logSchema);