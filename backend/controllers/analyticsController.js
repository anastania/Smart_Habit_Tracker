import Habit from "../models/Habit.js";
import Progress from "../models/Progress.js";

// Overview of all habits
export const getOverview = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    const totalHabits = habits.length;

    const totalProgress = await Progress.find({
      habitId: { $in: habits.map((h) => h._id) },
      completed: true,
    }).countDocuments();

    res.json({
      totalHabits,
      totalProgress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Analytics for one habit
export const getHabitAnalytics = async (req, res) => {
  try {
    const { habitId } = req.params;

    const progress = await Progress.find({ habitId, completed: true });
    const totalCompleted = progress.length;

    res.json({
      habitId,
      totalCompleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
