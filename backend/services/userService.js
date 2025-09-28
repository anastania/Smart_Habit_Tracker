// services/userService.js
import { mongoose } from '../config/db';
import User from '../models/User';
import Habit from '../models/Habit';
import Progress from '../models/Progress';

async function deleteUserCascade(userId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const habits = await Habit.find({ userId }, null, { session }).select('_id');
    const habitIds = habits.map(h => h._id);

    if (habitIds.length) {
      await Progress.deleteMany({ habitId: { $in: habitIds } }, { session });
    }

    await Habit.deleteMany({ userId }, { session });
    await User.deleteOne({ _id: userId }, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

export { deleteUserCascade };
