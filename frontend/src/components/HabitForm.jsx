import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HabitForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        frequency: initialData?.frequency || 'daily',
        targetDays: initialData?.targetDays || 21
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-light-textMuted dark:text-dark-textMuted mb-1">
                    Titre
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border
                             bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text
                             focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-light-textMuted dark:text-dark-textMuted mb-1">
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border
                             bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text
                             focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent"
                    rows="3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-light-textMuted dark:text-dark-textMuted mb-1">
                    Fréquence
                </label>
                <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border
                             bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text
                             focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent"
                >
                    <option value="daily">Quotidien</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuel</option>
                </select>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
            >
                {initialData ? 'Mettre à jour' : 'Créer'}
            </motion.button>
        </form>
    );
};

export default HabitForm;