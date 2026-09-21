const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get today's tasks
router.get('/today', async (req, res) => {
  try {
    // In a real app, userId comes from auth middleware
    const today = new Date().toISOString().split('T')[0];
    const tasks = await Task.find({ date: today }).sort({ time: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create task
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, date, time, durationMinutes, priority, isBossTask, category } = req.body;
    const newTask = new Task({
      userId, title, description, date, time, durationMinutes, priority, isBossTask, category
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Complete task
router.patch('/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    
    task.completed = true;
    task.completedAt = new Date();
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Parse natural language task
const { parseNaturalLanguageTask } = require('../services/ai/task.service');

router.post('/parse', async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: 'No input provided' });
    
    const structuredTask = await parseNaturalLanguageTask(input);
    res.json(structuredTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse task' });
  }
});

module.exports = router;
