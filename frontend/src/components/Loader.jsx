import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'medium' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center">
            <motion.div
                className={`${sizeClasses[size]} rounded-full border-4 border-light-border dark:border-dark-border border-t-light-primary dark:border-t-dark-primary`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default Loader;