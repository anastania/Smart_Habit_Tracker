const mongoose = require('mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');
const Progress = require('../models/Progress');
require('dotenv').config();

const seedData = async () => {
    try {
        // Connexion à la base de données
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Nettoyage des collections existantes
        await Promise.all([
            User.deleteMany({}),
            Habit.deleteMany({}),
            Progress.deleteMany({})
        ]);

        // Création d'un utilisateur test
        const user = await User.create({
            name: 'Utilisateur Test',
            email: 'test@example.com',
            password: 'password123'
        });

        // Création d'habitudes test
        const habits = await Habit.create([
            {
                userId: user._id,
                title: 'Méditation quotidienne',
                description: '15 minutes de méditation chaque matin',
                frequency: 'daily',
                targetDays: 30,
                startDate: new Date()
            },
            {
                userId: user._id,
                title: 'Exercice physique',
                description: '30 minutes de sport',
                frequency: 'weekly',
                targetDays: 3,
                startDate: new Date()
            },
            {
                userId: user._id,
                title: 'Lecture',
                description: 'Lire 20 pages',
                frequency: 'daily',
                targetDays: 21,
                startDate: new Date()
            }
        ]);

        // Création de progrès test
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        for (const habit of habits) {
            await Progress.create([
                {
                    habitId: habit._id,
                    userId: user._id,
                    date: today,
                    completed: true
                },
                {
                    habitId: habit._id,
                    userId: user._id,
                    date: yesterday,
                    completed: true
                }
            ]);
        }

        console.log('Données de test créées avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la création des données :', error);
        process.exit(1);
    }
};

seedData();