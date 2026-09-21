const mongoose = require('mongoose');

const dailyReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  plannedCount: { type: Number, default: 0 },
  completedCount: { type: Number, default: 0 },
  overdueCount: { type: Number, default: 0 },
  aiSummary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyReview', dailyReviewSchema);
