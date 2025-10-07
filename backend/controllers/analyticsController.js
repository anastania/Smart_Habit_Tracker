import Habit from "../models/Habit.js";
import Progress from "../models/Progress.js";

// === Overview (all habits) ===
export const getOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    const habits = await Habit.find({ userId });
    const totalHabits = habits.length;

    // Get all progress entries for user's habits
    const progress = await Progress.find({
      userId,
      habitId: { $in: habits.map((h) => h._id) },
    });

    // Calculate today's completed count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completedToday = progress.filter(
      (p) => p.completed && new Date(p.date) >= today
    ).length;

    // Calculate overall completion rate (based on all progress entries)
    const totalCompleted = progress.filter((p) => p.completed).length;
    const completionRate =
      progress.length > 0
        ? Math.round((totalCompleted / progress.length) * 100)
        : 0;

    // === Build detailed habits with 7-day floating chart data ===
    const habitsWithProgress = await Promise.all(
      habits.map(async (habit) => {
        const habitProgress = progress.filter(
          (p) => p.habitId.toString() === habit._id.toString()
        );

        // Last 7 days (for floating bars)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const formatted = date.toISOString().split("T")[0];

          const match = habitProgress.find((p) => {
            const pDate = new Date(p.date).toISOString().split("T")[0];
            return pDate === formatted;
          });

          return {
            date: formatted,
            completed: match ? match.completed : false,
          };
        });

        // Individual habit completion rate
        const habitCompletionRate =
          habitProgress.length > 0
            ? Math.round(
                (habitProgress.filter((p) => p.completed).length /
                  habitProgress.length) *
                  100
              )
            : 0;

        return {
          _id: habit._id,
          title: habit.title,
          frequency: habit.frequency,
          streak: habit.currentStreak || 0,
          completionRate: habitCompletionRate,
          chartData: last7Days,
        };
      })
    );

    res.json({
      habits: habitsWithProgress,
      overview: { totalHabits, completedToday, completionRate },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: error.message });
  }
};

// === One habit analytics (optional) ===
export const getHabitAnalytics = async (req, res) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const progress = await Progress.find({ habitId }).sort({ date: 1 });
    const totalCompleted = progress.filter((p) => p.completed).length;

    // Build per-day data for floating chart
    const chartData = progress.map((p) => ({
      date: new Date(p.date).toISOString().split("T")[0],
      completed: p.completed,
    }));

    res.json({
      habitId,
      totalCompleted,
      chartData,
    });
  } catch (error) {
    console.error("Habit analytics error:", error);
    res.status(500).json({ message: error.message });
  }
};
