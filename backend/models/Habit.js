import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  startDate: { type: Date, default: Date.now },
  streakCount: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

export default mongoose.model('Habit', habitSchema);
