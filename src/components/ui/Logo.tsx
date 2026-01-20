import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-2xl' },
    lg: { width: 56, height: 56, text: 'text-3xl' },
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Logo */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#logoGradient)"
          opacity="0.2"
        />
        
        {/* Music Note - Main */}
        <path
          d="M 35 25 L 35 65 Q 35 75 25 75 Q 15 75 15 65 Q 15 55 25 55 Q 30 55 35 60 L 35 20 Q 35 10 45 10 Q 55 10 55 20 L 55 50 Q 55 60 65 60 Q 75 60 75 50 Q 75 40 65 40 Q 60 40 55 45 L 55 20 Q 55 10 45 10"
          fill="url(#logoGradient)"
          stroke="url(#logoGradient2)"
          strokeWidth="2"
        />
        
        {/* Up Arrow - Representing "Next Up" */}
        <path
          d="M 50 70 L 50 85 M 50 85 L 42 77 M 50 85 L 58 77"
          stroke="url(#logoGradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Decorative Elements - Sound Waves */}
        <circle cx="20" cy="30" r="2" fill="#ec4899" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="35" r="2" fill="#6366f1" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="70" r="1.5" fill="#8b5cf6" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="75" cy="75" r="1.5" fill="#ec4899" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Text */}
      {showText && (
        <h1 className={`${dimensions.text} font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}>
          NextUp
        </h1>
      )}
    </div>
  );
};

export default Logo;
