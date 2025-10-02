import React, { useState, useEffect } from 'react';
import { getOverview, getHabitAnalytics } from '../services/analyticsService';
import ProgressChart from '../components/ProgressChart';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState({
        habits: [],
        overview: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const overview = await getOverview();
                setAnalyticsData({
                    habits: overview.habits || [],
                    overview: overview
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Analytiques</h1>
            
            {analyticsData.overview && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-2">Total des habitudes</h3>
                        <p className="text-2xl font-bold">{analyticsData.overview.totalHabits}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-2">Complétées aujourd'hui</h3>
                        <p className="text-2xl font-bold">{analyticsData.overview.completedToday}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-2">Taux de réussite</h3>
                        <p className="text-2xl font-bold">{analyticsData.overview.completionRate}%</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analyticsData.habits.map(habit => (
                    <div key={habit._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">{habit.title}</h3>
                        <ProgressChart data={habit.progressData} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;
