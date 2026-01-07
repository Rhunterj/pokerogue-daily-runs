import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="mb-6">
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3962b4 0%, #295294 100%)'
          }}
        />
      </div>
    </div>
  );
}

