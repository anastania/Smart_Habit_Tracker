import Progress from "../models/Progress.js";

// Add progress for a habit
export const addProgress = async (req, res) => {
  try {
    const { habitId, date, completed } = req.body;

    const progress = await Progress.create({
      habitId,
      date,
      completed,
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get progress of a habit
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ habitId: req.params.habitId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
