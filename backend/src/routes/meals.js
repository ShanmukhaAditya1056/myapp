const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Get meals for today
router.get('/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const meals = await Meal.find({ date: today });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
