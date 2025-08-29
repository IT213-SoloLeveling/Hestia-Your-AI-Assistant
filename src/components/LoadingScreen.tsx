import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
        {/* Outer Glow Ring */}
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl animate-pulse"></div>
        
        {/* Circular Progress Background */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex items-center justify-center">
          {/* Outer Glow Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-lg animate-pulse"></div>
          
          {/* Background Circle */}
          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))'
              }}
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Central Hestia Icon with Enhanced Effects */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Icon Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full blur-xl animate-pulse"></div>
            
            {/* Icon Container with Rotation */}
            <div className="relative animate-spin-slow">
                             <img 
                 src="/hestia-icon.svg" 
                 alt="Hestia"  
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl animate-bounce"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8)) brightness(1.2) contrast(1.1)'
                }}
              />
            </div>
            
            {/* Multiple Glow Rings */}
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-purple-300 rounded-full blur-lg opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-4 bg-pink-300 rounded-full blur-md opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Loading Text with Enhanced Effects */}
        <div className="text-center mt-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-futuristic font-bold text-white mb-2 glow-text animate-pulse">
            Hestia Chatbot
          </h2>
          <p className="text-purple-200 text-sm sm:text-base animate-pulse" style={{ animationDelay: '0.5s' }}>
            Tourism & Hospitality Assistant
          </p>
          <div className="mt-4 flex flex-col items-center">
            {/* Enhanced Progress Bar */}
            <div className="w-32 h-2 bg-purple-700/30 rounded-full overflow-hidden backdrop-blur-sm border border-purple-500/20">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Progress Bar Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/50 to-pink-300/50 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-purple-300 text-xs mt-2 animate-pulse" style={{ animationDelay: '1s' }}>{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
