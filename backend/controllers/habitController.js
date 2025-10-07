import Habit from "../models/Habit.js";
import Progress from "../models/Progress.js";

// Create a new habit
export const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;

    const habit = await Habit.create({
      userId: req.user._id,
      title,
      description,
      frequency,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all habits for logged-in user
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update habit
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track habit progress
// backend/controllers/habitController.js

export const trackHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.id;

    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed for this period
    let alreadyCompleted = false;

    if (habit.frequency === "daily") {
      alreadyCompleted =
        habit.lastTrackedDate &&
        new Date(habit.lastTrackedDate).toDateString() === today.toDateString();
    } else if (habit.frequency === "weekly") {
      const last = new Date(habit.lastTrackedDate);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      alreadyCompleted = habit.lastTrackedDate && last > oneWeekAgo;
    } else if (habit.frequency === "monthly") {
      const last = new Date(habit.lastTrackedDate);
      alreadyCompleted =
        habit.lastTrackedDate &&
        last.getMonth() === today.getMonth() &&
        last.getFullYear() === today.getFullYear();
    }

    if (alreadyCompleted) {
      return res.status(400).json({ message: "Already completed this period" });
    }

    // Mark as completed
    habit.lastTrackedDate = now;
    habit.currentStreak += 1;
    if (habit.currentStreak > habit.longestStreak) {
      habit.longestStreak = habit.currentStreak;
    }

    await habit.save();

    // Record in Progress table
    const progress = new Progress({
      habitId,
      userId,
      date: now,
      completed: true,
    });
    await progress.save();

    res.json({ message: "Habit tracked", habit, progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

