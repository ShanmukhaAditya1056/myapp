const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true }, // Format YYYY-MM-DD
  time: { type: String }, // Format HH:MM
  durationMinutes: { type: Number, default: 30 },
  priority: { type: String, enum: ['low', 'normal', 'high', 'critical'], default: 'normal' },
  isBossTask: { type: Boolean, default: false },
  category: { type: String, default: 'general' }, // e.g. study, routine, project
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
