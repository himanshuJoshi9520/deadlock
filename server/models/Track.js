const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    trackNumber: {
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
        enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
        default: 'AVAILABLE'
    },
    currentTrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    },
    connectedTracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

trackSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Track', trackSchema); 