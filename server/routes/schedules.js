const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Train = require('../models/Train');

// Get all schedules
router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('train')
            .populate('route.track');
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one schedule
router.get('/:id', async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
            .populate('train')
            .populate('route.track');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create schedule
router.post('/', async (req, res) => {
    const schedule = new Schedule({
        train: req.body.trainId,
        route: req.body.route,
        status: req.body.status || 'ACTIVE'
    });

    try {
        const newSchedule = await schedule.save();
        
        // Update train with new schedule
        const train = await Train.findById(req.body.trainId);
        if (train) {
            train.schedule = newSchedule._id;
            await train.save();
        }

        res.status(201).json(newSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update schedule
router.patch('/:id', async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        Object.keys(req.body).forEach(key => {
            schedule[key] = req.body[key];
        });

        const updatedSchedule = await schedule.save();
        res.json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete schedule
router.delete('/:id', async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Remove schedule reference from train
        const train = await Train.findById(schedule.train);
        if (train) {
            train.schedule = null;
            await train.save();
        }

        await schedule.remove();
        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update route status
router.patch('/:id/route/:routeIndex/status', async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        const routeIndex = parseInt(req.params.routeIndex);
        if (routeIndex < 0 || routeIndex >= schedule.route.length) {
            return res.status(400).json({ message: 'Invalid route index' });
        }

        schedule.route[routeIndex].status = req.body.status;
        const updatedSchedule = await schedule.save();
        res.json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 