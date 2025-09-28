import Habit from "../models/Habit.js";

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
