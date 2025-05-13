const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['IDLE', 'MOVING', 'STOPPED'],
        default: 'IDLE'
    },
    currentTrack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    },
    allocatedTracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    requestedTracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

trainSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Train', trainSchema); 