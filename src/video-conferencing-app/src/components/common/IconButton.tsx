import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, className }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center p-2 rounded hover:bg-gray-200 focus:outline-none ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;