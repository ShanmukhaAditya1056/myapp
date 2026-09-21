const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  wakeTime: { type: String, default: "06:15" },
  sleepTime: { type: String, default: "23:00" },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  wakeStreak: { type: Number, default: 0 },
  studyStreak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
