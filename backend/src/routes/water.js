const express = require('express');
const router = express.Router();
const WaterLog = require('../models/WaterLog');

// Get water log for today
router.get('/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logs = await WaterLog.find({ date: today });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add water log
router.post('/', async (req, res) => {
  try {
    // Hardcoded dummy user ID for now since no auth is implemented
    const dummyUserId = "640c1e8d7a12b91c8e123456"; 
    const { amountMl, date } = req.body;
    const newLog = new WaterLog({ userId: dummyUserId, amountMl, date });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log water' });
  }
});

module.exports = router;
