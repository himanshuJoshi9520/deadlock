const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Get all trains
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find()
            .populate('currentTrack')
            .populate('allocatedTracks')
            .populate('requestedTracks')
            .populate('schedule');
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one train
router.get('/:id', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id)
            .populate('currentTrack')
            .populate('allocatedTracks')
            .populate('requestedTracks')
            .populate('schedule');
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create train
router.post('/', async (req, res) => {
    const train = new Train({
        trainNumber: req.body.trainNumber,
        name: req.body.name,
        status: req.body.status || 'IDLE'
    });

    try {
        const newTrain = await train.save();
        res.status(201).json(newTrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update train
router.patch('/:id', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        Object.keys(req.body).forEach(key => {
            train[key] = req.body[key];
        });

        const updatedTrain = await train.save();
        res.json(updatedTrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete train
router.delete('/:id', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        await train.remove();
        res.json({ message: 'Train deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Request track
router.post('/:id/request-track', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        const trackId = req.body.trackId;
        if (!train.requestedTracks.includes(trackId)) {
            train.requestedTracks.push(trackId);
            await train.save();
        }

        res.json(train);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 