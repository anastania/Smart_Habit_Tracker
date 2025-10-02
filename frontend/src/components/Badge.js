import React from 'react';
import { TrophyIcon, StarIcon, FireIcon, FlagIcon } from '@heroicons/react/24/solid';

const Badge = ({ type, title, description, earned = false, progress = 0 }) => {
  const getBadgeConfig = (badgeType) => {
    switch (badgeType) {
      case 'streak':
        return {
          icon: FireIcon,
          colors: 'from-orange-400 to-red-500',
          bgColors: earned ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gray-200',
          textColors: earned ? 'text-white' : 'text-gray-500'
        };
      case 'achievement':
        return {
          icon: TrophyIcon,
          colors: 'from-yellow-400 to-orange-500',
          bgColors: earned ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-200',
          textColors: earned ? 'text-white' : 'text-gray-500'
        };
      case 'milestone':
        return {
          icon: StarIcon,
          colors: 'from-purple-400 to-pink-500',
          bgColors: earned ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gray-200',
          textColors: earned ? 'text-white' : 'text-gray-500'
        };
      case 'target':
        return {
          icon: FlagIcon,
          colors: 'from-blue-400 to-cyan-500',
          bgColors: earned ? 'bg-gradient-to-r from-blue-400 to-cyan-500' : 'bg-gray-200',
          textColors: earned ? 'text-white' : 'text-gray-500'
        };
      default:
        return {
          icon: StarIcon,
          colors: 'from-gray-400 to-gray-500',
          bgColors: earned ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 'bg-gray-200',
          textColors: earned ? 'text-white' : 'text-gray-500'
        };
    }
  };

  const config = getBadgeConfig(type);
  const IconComponent = config.icon;

  return (
    <div className={`relative rounded-xl p-4 transition-all duration-300 ${
      earned ? 'transform hover:scale-105 shadow-lg' : 'shadow-md'
    } ${config.bgColors}`}>
      {/* Progress Bar (if not earned) */}
      {!earned && progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white bg-opacity-30 rounded-t-xl">
          <div 
            className="h-full bg-white rounded-t-xl transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      )}

      {/* Badge Content */}
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${earned ? 'bg-white bg-opacity-20' : 'bg-gray-300'}`}>
          <IconComponent className={`w-6 h-6 ${config.textColors}`} />
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold ${config.textColors}`}>
            {title}
          </h4>
          <p className={`text-sm ${earned ? 'text-white text-opacity-90' : 'text-gray-500'}`}>
            {description}
          </p>
          {!earned && progress > 0 && (
            <div className="mt-2">
              <div className="text-xs text-white text-opacity-80">
                {Math.round(progress)}% complete
              </div>
            </div>
          )}
        </div>

        {/* Earned Indicator */}
        {earned && (
          <div className="flex items-center">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Shine Effect (if earned) */}
      {earned && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
      )}
    </div>
  );
};

export default Badge;
