require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
db.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.warn('⚠️  Database connection warning:', err.message);
        console.log('ℹ️  Running server in demo mode without database connection');
    } else {
        console.log('✓ Database connected successfully');
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/tasks', tasksRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`QMin Backend Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});
