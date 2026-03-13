import React from 'react';

interface HeartProps {
  percentage: number;
}

export const Heart: React.FC<HeartProps> = ({ percentage }) => {
  const fill = Math.min(100, Math.max(0, percentage));
  
  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 32 29.6" className="w-full h-full">
        <path
          d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"
          fill="#3f3f46"
        />
        <path
          d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"
          fill="#ef4444"
          style={{ clipPath: `inset(${100 - fill}% 0 0 0)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-lg">
        {Math.round(fill)}%
      </div>
    </div>
  );
};
