import React from 'react';

const Loader = ({ size = 'medium' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center">
            <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin`}></div>
        </div>
    );
};

export default Loader;