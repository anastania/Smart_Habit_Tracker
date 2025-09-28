import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true, index: true },
  date: { type: Date, required: true }, // normaliser à 00:00:00 UTC pour uniq
  completed: { type: Boolean, default: false }
});

// Empêcher doublon (même habit + même date)
progressSchema.index({ habitId: 1, date: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
