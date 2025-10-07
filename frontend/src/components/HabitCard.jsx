import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Edit2, Trash2 } from 'lucide-react';

const HabitCard = ({ habit, onEdit, onDelete, onTrack }) => {
const isCompleted = habit.isCompletedToday;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover:shadow-lg"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                    {habit.title}
                </h3>
                <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(habit)}
                        className="p-1.5 rounded-lg text-light-textMuted dark:text-dark-textMuted 
                                 hover:text-light-primary dark:hover:text-dark-primary"
                    >
                        <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(habit._id)}
                        className="p-1.5 rounded-lg text-light-textMuted dark:text-dark-textMuted 
                                 hover:text-dark-secondary"
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            <p className="text-light-textMuted dark:text-dark-textMuted mb-4">
                {habit.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-sm text-light-textMuted dark:text-dark-textMuted">
                    {habit.frequency}
                </span>
                <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
        const habitId = habit._id || habit.id; // fallback if backend uses 'id'
        if (!isCompleted && habitId) {
            onTrack(habitId);
        } else if (!habitId) {
            console.error("❌ Missing habit ID:", habit);
        }
    }}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
        ${isCompleted 
            ? 'bg-light-success/20 dark:bg-dark-success/20 text-light-success dark:text-dark-success cursor-default'
            : 'bg-light-primary dark:bg-dark-primary text-white hover:opacity-90'
        }`}
>
    <CheckCircle className="w-5 h-5" />
    <span>{isCompleted ? 'Complété' : 'Compléter'}</span>
</motion.button>

            </div>
        </motion.div>
    );
};

export default HabitCard;
