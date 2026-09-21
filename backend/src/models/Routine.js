const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['morning', 'evening', 'custom'], default: 'custom' },
  items: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  daysOfWeek: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Routine', routineSchema);
