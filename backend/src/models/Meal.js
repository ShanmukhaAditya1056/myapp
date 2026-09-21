const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
  items: [{
    name: { type: String, required: true },
    checked: { type: Boolean, default: false }
  }],
  date: { type: String, required: true }, // YYYY-MM-DD
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);
