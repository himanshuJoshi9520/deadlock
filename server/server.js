const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/train-scheduling', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const trainRoutes = require('./routes/trains');
const trackRoutes = require('./routes/tracks');
const scheduleRoutes = require('./routes/schedules');

app.use('/api/trains', trainRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/schedules', scheduleRoutes);

// Deadlock detection endpoint
app.post('/api/detect-deadlock', (req, res) => {
    const { trains, tracks } = req.body;
    const deadlock = detectDeadlock(trains, tracks);
    res.json({ deadlock });
});

// Deadlock detection algorithm
function detectDeadlock(trains, tracks) {
    // Create resource allocation graph
    const graph = new Map();
    
    // Initialize graph
    trains.forEach(train => {
        graph.set(train.id, new Set());
    });

    // Build graph based on current allocations and requests
    trains.forEach(train => {
        train.allocatedTracks.forEach(trackId => {
            const track = tracks.find(t => t.id === trackId);
            if (track && track.requestedBy) {
                graph.get(train.id).add(track.requestedBy);
            }
        });
    });

    // Check for cycles in the graph (deadlock detection)
    const visited = new Set();
    const recursionStack = new Set();

    function hasCycle(node) {
        if (!visited.has(node)) {
            visited.add(node);
            recursionStack.add(node);

            const neighbors = graph.get(node) || new Set();
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && hasCycle(neighbor)) {
                    return true;
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }
        }
        recursionStack.delete(node);
        return false;
    }

    // Check each train for cycles
    for (const train of trains) {
        if (hasCycle(train.id)) {
            return {
                detected: true,
                message: 'Deadlock detected in the train scheduling system',
                involvedTrains: Array.from(recursionStack)
            };
        }
    }

    return {
        detected: false,
        message: 'No deadlock detected'
    };
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 