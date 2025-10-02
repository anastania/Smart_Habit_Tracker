import React from 'react';

const HabitCard = ({ habit, onEdit, onDelete, onTrack }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{habit.title}</h3>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => onEdit(habit)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Éditer
                    </button>
                    <button 
                        onClick={() => onDelete(habit._id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
            <p className="text-gray-600 mb-4">{habit.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Fréquence: {habit.frequency}
                </span>
                <button
                    onClick={() => onTrack(habit._id)}
                    className={`px-4 py-2 rounded ${
                        habit.completedToday
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={habit.completedToday}
                >
                    {habit.completedToday ? 'Complété' : 'Compléter'}
                </button>
            </div>
        </div>
    );
};

export default HabitCard;
