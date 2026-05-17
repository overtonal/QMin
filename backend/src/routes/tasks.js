const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get tasks by status
router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const validStatuses = ['To-Do', 'In Progress', 'Done'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const tasks = await Task.getByStatus(status);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks by status:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get single task
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.getById(id);
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// Create new task
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Task name is required' });
        }

        const task = await Task.create(name, description || '');
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Task name is required' });
        }

        const existingTask = await Task.getById(id);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const validStatuses = ['To-Do', 'In Progress', 'Done'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedTask = await Task.update(id, name, description || existingTask.description, status || existingTask.status);
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Update task status only
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const validStatuses = ['To-Do', 'In Progress', 'Done'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const existingTask = await Task.getById(id);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updatedTask = await Task.updateStatus(id, status);
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Failed to update task status' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.delete(id);
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
