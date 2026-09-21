const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'Wake Up' },
  time: { type: String, required: true }, // Format HH:MM
  enabled: { type: Boolean, default: true },
  daysOfWeek: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] },
  strictness: { type: String, enum: ['Relaxed', 'Standard', 'Strict', 'Extreme'], default: 'Standard' },
  challengeTypes: { type: [String], default: ['Math'] },
  challengeCount: { type: Number, default: 1 },
  qrCheckpoint: { type: String }, // ID or string payload for QR checkpoint
  sound: { type: String, default: 'default' },
  vibration: { type: Boolean, default: true },
  snoozeEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', alarmSchema);
