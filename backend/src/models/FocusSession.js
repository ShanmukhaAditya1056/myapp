const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  durationMinutes: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }
});

module.exports = mongoose.model('FocusSession', focusSessionSchema);
