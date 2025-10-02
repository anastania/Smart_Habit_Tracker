import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Habit Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build better habits, track your progress, and achieve your goals with our intelligent habit tracking system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/register" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Habits</h3>
            <p className="text-gray-600">
              Monitor your daily habits and build consistency with our intuitive tracking system.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">View Analytics</h3>
            <p className="text-gray-600">
              Get insights into your progress and patterns with detailed analytics and reports.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Stay Motivated</h3>
            <p className="text-gray-600">
              Celebrate your achievements and stay on track with gamification and rewards.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have successfully built lasting habits.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md"
          >
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
