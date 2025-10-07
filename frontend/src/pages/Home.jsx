import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [index, setIndex] = useState(0);

  // === Simple image slider ===
  const images = [
    '/images/habit1.jpeg',
    '/images/habit2.jpeg',
    '/images/habit3.jpeg',
    '/images/habit4.jpeg',
    '/images/habit5.jpeg',
    '/images/habit6.jpeg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* === HERO SECTION === */}
      <div className="max-w-7xl  h-screen mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-heading font-semibold text-light-text dark:text-dark-text mb-6"
        >
          Développez de Meilleures Habitudes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-light-textMuted dark:text-dark-textMuted mb-12 max-w-2xl mx-auto"
        >
          Suivez vos progrès, boostez votre discipline et révélez la meilleure version de vous-même avec{' '}
          <span className="text-light-primary dark:text-dark-primary font-semibold">Smart Habit Tracker</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Accéder au Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Connexion
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="px-6 py-2 rounded-lg border-2 border-light-primary dark:border-dark-primary
                           text-light-primary dark:text-dark-primary hover:bg-light-primary/10 
                           dark:hover:bg-dark-primary/10 transition-colors"
              >
                Inscription
              </motion.button>
            </>
          )}
        </motion.div>
      </div>

      {/* === IMAGE SLIDER === */}
<div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-xl mb-20">
  <AnimatePresence mode="wait">
    <motion.img
      key={images[index]}
      src={images[index]}
      alt="Habitude visuelle"
      initial={{ opacity: 0, scale: 1.05, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-[400px] object-cover rounded-2xl"
    />
  </AnimatePresence>

  {/* Navigation buttons */}
  <button
    onClick={() => setIndex((index - 1 + images.length) % images.length)}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>
  <button
    onClick={() => setIndex((index + 1) % images.length)}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
</div>


      {/* === FEATURES SECTION === */}
      <div className="bg-white dark:bg-[#1A1B1F] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <CheckCircle className="w-10 h-10 text-light-primary dark:text-dark-primary mb-4 mx-auto" />,
              title: "Suivi Simple & Intelligent",
              desc: "Ajoutez vos habitudes quotidiennes, hebdomadaires ou mensuelles et suivez vos progrès sans effort.",
            },
            {
              icon: <BarChart3 className="w-10 h-10 text-light-primary dark:text-dark-primary mb-4 mx-auto" />,
              title: "Statistiques Visuelles",
              desc: "Visualisez vos réussites et identifiez vos points d'amélioration grâce à des graphiques clairs et précis.",
            },
            {
              icon: <Clock className="w-10 h-10 text-light-primary dark:text-dark-primary mb-4 mx-auto" />,
              title: "Routine Durable",
              desc: "Créez une discipline solide à votre rythme et maintenez vos bonnes habitudes sur le long terme.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-md bg-light-bg dark:bg-[#0D0D0F] hover:shadow-lg transition-shadow"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-light-textMuted dark:text-dark-textMuted">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === CALL TO ACTION === */}
      <div className="py-20 bg-light-primary/10 dark:bg-dark-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-semibold text-light-text dark:text-dark-text mb-4"
          >
            Commencez à bâtir vos habitudes dès aujourd’hui
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-light-textMuted dark:text-dark-textMuted mb-8"
          >
            Rejoignez des utilisateurs motivés comme vous, et transformez vos objectifs en réalisations concrètes.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="btn-primary flex items-center mx-auto space-x-2"
          >
            <span>{user ? 'Aller au Dashboard' : 'Créer un Compte Gratuit'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* === SOCIAL FOOTER === */}
      <footer className="bg-[#0D0D0F] text-white py-10 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-semibold mb-4">Suivez-nous sur les réseaux</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 hover:text-light-primary transition" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 hover:text-light-primary transition" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:text-light-primary transition" />
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            © {new Date().getFullYear()} Smart Habit Tracker — Développé avec passion par Anas Serghini.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
