import React from 'react';

export default function LoadingSpinner({ size = 'md', text = 'Cargando...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-white`}></div>
      {text && (
        <p className="text-white/80 text-sm mt-2 font-medium">{text}</p>
      )}
    </div>
  );
} 