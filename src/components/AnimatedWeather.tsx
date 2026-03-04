import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface AnimatedWeatherProps {
  condition: string;
  size?: number;
}

export const AnimatedWeather: React.FC<AnimatedWeatherProps> = ({ condition, size = 64 }) => {
  const iconProps = {
    size,
    className: "relative z-10"
  };

  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return (
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"
          />
          <Sun {...iconProps} className="text-yellow-500" />
        </div>
      );
    case 'partly cloudy':
    case 'cloudy':
      return (
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud {...iconProps} className="text-slate-400" />
          </motion.div>
        </div>
      );
    case 'rainy':
    case 'drizzle':
      return (
        <div className="relative flex items-center justify-center">
          <CloudRain {...iconProps} className="text-blue-500" />
          <div className="absolute top-full left-0 right-0 flex justify-around">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 20, opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                className="w-0.5 h-3 bg-blue-400 rounded-full"
              />
            ))}
          </div>
        </div>
      );
    case 'snowy':
      return (
        <div className="relative flex items-center justify-center">
          <CloudSnow {...iconProps} className="text-blue-200" />
          <div className="absolute inset-0 flex justify-around items-center">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, 20], 
                  x: [0, i % 2 === 0 ? 5 : -5],
                  opacity: [0, 1, 0] 
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="w-1 h-1 bg-white rounded-full"
              />
            ))}
          </div>
        </div>
      );
    case 'stormy':
      return (
        <div className="relative flex items-center justify-center">
          <Zap {...iconProps} className="text-yellow-400" />
          <motion.div
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-yellow-200/30 blur-lg rounded-full"
          />
        </div>
      );
    case 'windy':
      return (
        <div className="relative flex items-center justify-center">
          <Wind {...iconProps} className="text-slate-300" />
          <motion.div
            animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-10 h-0.5 bg-slate-200/50 rounded-full"
          />
        </div>
      );
    default:
      return <Cloud {...iconProps} className="text-slate-400" />;
  }
};
