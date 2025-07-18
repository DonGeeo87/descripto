import React, { useState, useEffect } from 'react';

export default function Notification({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-400/50',
      text: 'text-green-200',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-400/50',
      text: 'text-red-200',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-400/50',
      text: 'text-blue-200',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400/50',
      text: 'text-yellow-200',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  };

  const styles = typeStyles[type];

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    }`}>
      <div className={`${styles.bg} ${styles.border} ${styles.text} rounded-2xl p-4 shadow-2xl backdrop-blur-sm border-2 max-w-sm`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {styles.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 