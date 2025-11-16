import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div
        className={`${sizeClasses[size]} border-4 border-white/10 border-t-gradient-to-r border-t-[#F45D01] rounded-full animate-spin`}
        style={{
          borderImage: 'linear-gradient(to right, #F45D01, #6559FF) 1',
        }}
      >
        <div className="w-full h-full border-4 border-transparent border-t-[#6559FF] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;

