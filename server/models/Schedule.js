const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    route: [{
        track: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track',
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED'],
            default: 'PENDING'
        }
    }],
    status: {
        type: String,
        enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
        default: 'ACTIVE'
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

scheduleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Schedule', scheduleSchema); 