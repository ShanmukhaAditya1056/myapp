const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Get user routines
router.get('/', async (req, res) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create routine
router.post('/', async (req, res) => {
  try {
    const newRoutine = new Routine(req.body);
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create routine' });
  }
});

module.exports = router;
