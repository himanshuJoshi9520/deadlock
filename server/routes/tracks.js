const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find()
            .populate('currentTrain')
            .populate('requestedBy');
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one track
router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id)
            .populate('currentTrain')
            .populate('requestedBy');
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.json(track);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create track
router.post('/', async (req, res) => {
    const track = new Track({
        trackNumber: req.body.trackNumber,
        name: req.body.name,
        status: req.body.status || 'AVAILABLE'
    });

    try {
        const newTrack = await track.save();
        res.status(201).json(newTrack);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update track
router.patch('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }

        Object.keys(req.body).forEach(key => {
            track[key] = req.body[key];
        });

        const updatedTrack = await track.save();
        res.json(updatedTrack);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete track
router.delete('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }

        await track.remove();
        res.json({ message: 'Track deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 