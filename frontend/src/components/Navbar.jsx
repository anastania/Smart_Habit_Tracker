import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-light-bg dark:bg-dark-card border-b border-light-border dark:border-dark-border fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* === Logo === */}
          <div className="flex items-center group">
            <Link
              to={user ? "/dashboard" : "/"}
              className="flex items-center space-x-2 sm:space-x-3"
              onClick={() => setMenuOpen(false)}
            >
              {/* Icon Container */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-lg flex items-center justify-center overflow-hidden
                              bg-gradient-to-tr from-[#D97757] to-[#1A1B1F] 
                              dark:from-[#00E5FF] dark:to-[#6B6054] flex-shrink-0">
                <svg
                  className="absolute inset-0 w-full h-full opacity-25 mix-blend-overlay"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2" opacity="0.25" />
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" opacity="0.15" />
                  <path d="M20,80 Q50,20 80,80" stroke="white" strokeWidth="2" opacity="0.2" fill="none" />
                </svg>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-[#F5F5F5] relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" className="opacity-80" />
                  <path d="M9 12l2 2 4-4" className="opacity-90" />
                  <path d="M15 20c-2 .5-6 .5-8-2" className="opacity-70" />
                </svg>
              </div>

              {/* Logo Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-2xl font-extrabold 
                                 bg-gradient-to-tr from-[#D97757] to-[#1A1B1F] bg-clip-text text-transparent
                                 dark:from-[#00E5FF] dark:to-[#6B6054]">
                  HabitFlow
                </span>
                <span className="hidden sm:block text-[10px] text-gray-500 dark:text-gray-400 tracking-wide">
                  Votre compagnon d’habitudes
                </span>
              </div>
            </Link>
          </div>

          {/* === Desktop Nav Links === */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link 
                  to="/dashboard"
                  className="text-light-textMuted dark:text-dark-textMuted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/analytics"
                  className="text-light-textMuted dark:text-dark-textMuted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  Analytics
                </Link>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {user && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 text-light-textMuted dark:text-dark-textMuted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </motion.button>
            )}
          </div>

          {/* === Mobile Menu Button === */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Dropdown Menu === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-light-bg dark:bg-dark-card border-t border-light-border dark:border-dark-border shadow-md"
          >
            <div className="px-4 py-3 space-y-3 flex flex-col text-sm">
              {user && (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-light-primary dark:hover:text-dark-primary">
                    Dashboard
                  </Link>
                  <Link to="/analytics" onClick={() => setMenuOpen(false)} className="hover:text-light-primary dark:hover:text-dark-primary">
                    Analytics
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-light-textMuted dark:text-dark-textMuted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
