import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await registerService(formData);
            login(data, navigate);
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const inputFields = [
        {
            icon: User,
            name: 'name',
            label: 'Nom',
            type: 'text',
            placeholder: 'Votre nom complet'
        },
        {
            icon: Mail,
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'votre@email.com'
        },
        {
            icon: Lock,
            name: 'password',
            label: 'Mot de passe',
            type: 'password',
            placeholder: '••••••••'
        },
        {
            icon: Lock,
            name: 'confirmPassword',
            label: 'Confirmer le mot de passe',
            type: 'password',
            placeholder: '••••••••'
        }
    ];

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="card">
                    <h2 className="text-2xl font-heading font-semibold text-center mb-8">
                        Créer un compte
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center space-x-2 p-4 bg-dark-secondary/10 rounded-lg mb-6"
                        >
                            <AlertCircle className="w-5 h-5 text-dark-secondary" />
                            <p className="text-dark-secondary">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {inputFields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-light-textMuted dark:text-dark-textMuted mb-2">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <field.icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textMuted dark:text-dark-textMuted" />
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.name]}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-light-border dark:border-dark-border
                                                bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text
                                                focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'Création du compte...' : "S'inscrire"}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-light-textMuted dark:text-dark-textMuted">
                        Déjà un compte ?{' '}
                        <Link 
                            to="/login" 
                            className="text-light-primary dark:text-dark-primary hover:underline"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
